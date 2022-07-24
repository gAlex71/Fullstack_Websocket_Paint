import React from "react";
import Canvas from "./Canvas";
import SettingBar from "./SettingBar";
import ToolBar from "./ToolBar";

const Paint = () => {
    return(
        <div>
            <ToolBar/>
            <SettingBar/>
            <Canvas/>
        </div>
    )
}

export default Paint