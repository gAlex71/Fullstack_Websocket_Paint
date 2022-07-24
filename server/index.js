const express = require('express');
const app = express();
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const cors = require('cors')
const PORT = process.env.PORT || 5000
const fs = require('fs')
const path = require('path')

app.use(cors())
// Для того, чтобы наше приложение могло парсить json формат
app.use(express.json())

app.ws('/', (ws, req) => {
    console.log('Подключение установлено!');
    //Обработка сообщений от клиента
    //В зависимости от метода подключения будет выполняться разная логика
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch(msg.method){
            case "connection":
                connectionHandler(ws, msg)
                break
            case "draw":
                broadcastConnection(ws, msg)
                break
        }
    })
})


//Сохраняем изображение на сервере
app.post('/image', (req, res) => {
    try{
        //Удаляем первую часть url сохраняемого изображения
        const data = req.body.img.replace(`data:image/png;base64,`, '')
        fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64')
        return res.status(200).json({message: "Загружено"})
    }catch(e){
        console.log(e)
        return res.status(500).json('error')
    }
})
// Отдаем изображение с сервера
app.get('/image', (req, res) => {
    try{
        //Читаем файл
        const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
        const data = `data:image/png;base64,` + file.toString('base64')
        res.json(data)
    }catch(e){
        console.log(e)
        return res.status(500).json('error')
    }
})


app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))

const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws, msg)
}
//Функция широковещательной рассылки
//Оповещаем других пользователей о подключении
const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if(client.id === msg.id){
            client.send(JSON.stringify(msg))
        }
    })
}

