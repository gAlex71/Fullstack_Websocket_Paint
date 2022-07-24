import Tool from "./Tool.js"

export default class Circle extends Tool{
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
        let canvasData = this.canvas.toDataURL()
        this.ctx.beginPath()
        this.startX = e.pageX - e.target.offsetLeft
        this.startY = e.pageY - e.target.offsetTop
        //Каждый раз при нажатии на мышь сохраняем изображение с canvas
        this.saved = canvasData
    }
    // Слушатель движения кнопки мыши
    mouseMoveHandler(e){
        if(this.mouseDown){
            let currentX = e.pageX - e.target.offsetLeft
            let currentY = e.pageY - e.target.offsetTop
            //Из конечной(текущей) координаты вычитаем начальную
            let width = currentX - this.startX
            let height = currentY - this.startY
            let r = Math.sqrt(width**2 + height**2)
            this.draw(this.startX, this.startY, r)
        }
    }

    draw(x, y, r){
        const img = new Image()
        img.src = this.saved
        //Отрабатывает в тот момент, когда изображение установилось
        img.onload = async function(){
            //Очищаем canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            //Затем поместили изображение, которое нарисовали в самом начале
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            // Начинаем рисовать новую фигуру
            this.ctx.beginPath()
            this.ctx.arc(x, y, r, 0, 2*Math.PI)
            this.ctx.fill()
            this.ctx.stroke()
        }.bind(this)
    }
}