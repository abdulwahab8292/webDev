import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import {useState} from "react";
import "./App.css";
import Form from "./components/Form.jsx"; 
import MidContent from "./components/MidContent.jsx";

function App() {
  const [content, setContent] = useState("Verify Your Age")
  return (
    <div className="h-screen bg-blue-700 place-items-center">
      <div>
        <div className='text-white'><span className="text-green-400">Webinar.</span>gg</div>
      </div>
      <MidContent content={content} />
      <Form placeholder={placeholder}/>
    </div>
  );
}

export default App;
