import React from "react";
import "./style/app.scss"
import {Routes, Route} from 'react-router-dom'
import Paint from "./components/Paint";

const App = () => {
  return (
      <div className="app">
        <Routes>
          <Route path="/:id" element={<Paint/>}></Route>
          {/* <Navigate to={`/f${(+new Date).toString(16)}`}/> */}
        </Routes>
      </div>
  )
}

export default App;
