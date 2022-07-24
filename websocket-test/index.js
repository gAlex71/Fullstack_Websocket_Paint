const btn = document.getElementById('btn')
// const socket = new WebSocket('ws://localhost:5000/')

socket.onopen = () => {
    // console.log('Подключение установлено');
    socket.send(JSON.stringify({
        method: 'connection',
        id: 222,
        username: 'Alexandr'
    }))
}

socket.onmessage = (event) => {
    console.log('С сервера пришло сообщение', event.data);
}

btn.onclick = () => {
    // socket.send('Привет сервер')
    socket.send(JSON.stringify({
        message: 'Привет',
        method: 'message',
        id: 222,
        username: 'Alexandr'
    }))
}