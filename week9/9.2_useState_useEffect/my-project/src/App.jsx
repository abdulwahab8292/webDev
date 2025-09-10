import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Counter from "./components/Counter";
function App() {
  const [counterVisible, setCounterVisible] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setCounterVisible((prevState) => !prevState);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return <div>{counterVisible && <Counter />}</div>;
}
export default App;
