import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Class11Program from "./components/Class11Program";
import Class12Program from "./components/Class12Program";
import Landing from "./components/Landing";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route
        path="/neet/online-coaching-class-11"
        element={<Class11Program />}
      ></Route>
      <Route
        path="/neet/online-coaching-class-12"
        element={<Class12Program />}
      ></Route>
    </Routes>
  );
}

export default App;

