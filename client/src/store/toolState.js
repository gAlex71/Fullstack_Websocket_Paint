//Состояние и логика обработки этого состояния, связанного с инструментом
import { makeAutoObservable } from "mobx";

class ToolState{
    tool = null
    constructor(){
        // Эта функция сделает данные, которые хранятся в этом классе - отслеживаемыми
        makeAutoObservable(this)
    }

    //Ection - функция, которая как-то изменяет состояние объекта
    setTool(tool){
        this.tool = tool
    }
    setFillColor(color){
        this.tool.fillColor = color
    }
    setStrokeColor(color){
        this.tool.strokeColor = color
    }
    setLineWidth(width){
        this.tool.lineWidth = width
    }
}

export default new ToolState()