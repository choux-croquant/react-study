import React from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import RedPage from "./pages/RedPages";
import BluePage from "./pages/BluePages";

const App = () => {
  return (
    <div>
      <Menu />
      <hr />
      <Routes>
        <Route path="/red" element={<RedPage />}/>
        <Route path="/blue" element={<BluePage />}/>
      </Routes>
    </div>
  )
}

export default App