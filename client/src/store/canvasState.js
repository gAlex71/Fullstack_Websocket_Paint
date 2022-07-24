import { makeAutoObservable } from "mobx";

class CanvasState{
    canvas = null
    socket = null
    sessionid = null
    //Содержит действия, которые мы когда либо делали
    undoList = []
    // Действия, которые мы отменили
    redoList = []
    username = ""

    constructor(){
        // Эта функция сделает данные, которые хранятся в этом классе - отслеживаемыми
        makeAutoObservable(this)
    }

    setSocket(socket){
        this.socket = socket
    }

    setSessionId(id){
        this.sessionid = id
    }

    setUsername(username){
        this.username = username
    }

    setCanvas(canvas){
        this.canvas = canvas
    }

    pushToUndo(data){
        this.undoList.push(data)
    }
    pushToRedo(data){
        this.redoList.push(data)
    }

    undo(){
        let ctx = this.canvas.getContext('2d')
        if(this.undoList.length > 0){
            let dataURL = this.undoList.pop()
            //После отмены действия добавляем его в массив, чтобы мы могли его вернуть
            this.redoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataURL
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }else{
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }
    redo(){
        let ctx = this.canvas.getContext('2d')
        if(this.redoList.length > 0){
            let dataURL = this.redoList.pop()
            //После отмены действия добавляем его в массив, чтобы мы могли его вернуть
            this.undoList.push(this.canvas.toDataURL())//Текущее состояние canvas
            let img = new Image()
            img.src = dataURL
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
    }
}

export default new CanvasState()