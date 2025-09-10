import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Clock2 from "./components/Clock2";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-[100vw] h-[100vh] bg-slate-700 flex items-center justify-center">
      <div className="w-[20vw] h-[20vh] bg-white rounded">
        <Clock2 />
      </div>
    </div>
  );
}

export default App;
