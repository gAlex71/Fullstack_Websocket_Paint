//Создаем класс, который будет родительским для каждого инструмента
export default class Tool{
    //Параметром принимаем canvas
    constructor(canvas, socket, id){
        this.canvas = canvas
        this.socket = socket
        this.id = id
        //Контекст позволяет проводить манипуляция на canvas
        this.ctx = canvas.getContext('2d')
        this.destroyEvents()
    }

    //С помощью сетеров можно кастомно изменять значения
    //Цвет
    set fillColor(color){
        this.ctx.fillStyle = color
    }
    // Цвет обводки
    set strokeColor(color){
        this.ctx.strokeStyle = color
    }
    // Толщина линии
    set lineWidth(width){
        this.ctx.lineWidth = width
    }

    //При выборе нового инструмента, мы уничтожаем все слушатели, так как другая логика обработки событий
    destroyEvents(){
        this.canvas.onmousemove = null
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
    }
}