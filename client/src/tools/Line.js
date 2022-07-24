import Tool from "./Tool.js"

export default class Line extends Tool{
    constructor(canvas){
        super(canvas)
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
    }
    // Слушатель нажатия кнопки мыши
    mouseDownHandler(e){
        this.mouseDown = true
        this.currentX = e.pageX - e.target.offsetLeft
        this.currentY = e.pageY - e.target.offsetTop
        this.ctx.beginPath()
        //Начальные координаты, откуда будет рисоваться линия
        //Из координат мыши относительно страницы, мы отнимаем левый отступ canvas от начала страницы
        this.ctx.moveTo(this.currentX, this.currentY)//x,y
        this.saved = this.canvas.toDataURL()
    }
    // Слушатель удержания кнопки мыши
    mouseMoveHandler(e){
        if(this.mouseDown){
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
        }
    }

    draw(x, y){
        const img = new Image()
        img.src = this.saved
        //Отрабатывает в тот момент, когда изображение установилось
        img.onload = async function (){
            //Очищаем canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            //Затем поместили изображение, которое нарисовали в самом начале
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            // Начинаем рисовать новую фигуру
            this.ctx.beginPath()
            this.ctx.moveTo(this.currentX, this.currentY)
            // this.ctx.strokeStyle = "black"
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        }.bind(this)
    }
}