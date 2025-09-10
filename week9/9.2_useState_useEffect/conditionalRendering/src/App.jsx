import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import Counter from "./components/Counter";

function App() {
  const [count, setCount] = useState(0);
  const [visibility, setVisibility] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibility((prevState) => !prevState);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>{visibility && <Counter count={count} setCount={setCount} />}</div>
  );
}

export default App;
