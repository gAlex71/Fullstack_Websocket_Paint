import React from "react";
import canvasState from "../store/canvasState";
import "../style/toolbar.scss"
import Brush from "../tools/Brush";
import toolState from "../store/toolState";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";

const ToolBar = () => {

  //Изменяем состояние цветов
  const changeColor = e => {
    toolState.setFillColor(e.target.value)
    toolState.setStrokeColor(e.target.value)
  }

  //Функция скачивания файла на компьютер
  const download = () => {
    const dataUrl = canvasState.canvas.toDataURL()
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = canvasState.sessionid + ".jpg"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="toolbar">
      {/* В состояние добавляем новый объект кисти, в который передаем cfnvas из состояния */}
      <button className="toolbar__btn brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionid))}/>
      <button className="toolbar__btn rect" onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionid))}/>
      <button className="toolbar__btn circle" onClick={() => toolState.setTool(new Circle(canvasState.canvas))}/>
      <button className="toolbar__btn eraser" onClick={() => toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionid))}/>
      <button className="toolbar__btn line" onClick={() => toolState.setTool(new Line(canvasState.canvas))}/>
      <input onChange={e => changeColor(e)} style={{marginLeft:10}} type="color"/>
      <button className="toolbar__btn undo" onClick={() => canvasState.undo()}/>
      <button className="toolbar__btn redo" onClick={() => canvasState.redo()}/>
      <button className="toolbar__btn save" onClick={() => download()}/>
    </div>
  );
}

export default ToolBar;