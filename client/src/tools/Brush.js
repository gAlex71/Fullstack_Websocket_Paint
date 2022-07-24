import Tool from "./Tool.js"

export default class Brush extends Tool{
    constructor(canvas, socket, id){
        super(canvas, socket, id)
        //После создания объекта, наш canvas будет слушать все эти функции
        this.listen()
    }

    //Вешаем слушатели/bind - привязывает this
    listen(){
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    //Слушатель отпускания кнопки мыши
    mouseUpHandler(e){
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'finish',
            }
        }))
    }
    // Слушатель нажатия кнопки мыши
    mouseDownHandler(e){
        this.mouseDown = true
        this.ctx.beginPath()
        //Начальные координаты, откуда будет рисоваться линия
        //Из координат мыши относительно страницы, мы отнимаем левый отступ canvas от начала страницы
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)//x,y
    }
    // Слушатель удержания кнопки мыши
    mouseMoveHandler(e){
        if(this.mouseDown){
            // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
            //На каждое движение мышки, мы должны отправлять сообщение на сервер, чтобы другие участники видели, что мы рисуем
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'brush',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop
                }
            }))
        }
    }

    static draw(ctx, x, y){
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}