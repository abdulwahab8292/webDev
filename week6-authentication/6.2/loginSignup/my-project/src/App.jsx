import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route, Link, NavLink, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Parent from "./components/Parent";

function App() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  
  return (
    <div className="w-[100vw] h-[100vh] bg-black overflow-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Parent />}>
          <Route index element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
