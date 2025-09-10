import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 200);
  function changeHandler(e) {
    setInputValue(e.target.value);
  }
  useEffect(() => {
    console.log("expensive operation");
  }, [debouncedValue]);
  return (
    <div>
      <input type="text" onChange={changeHandler}></input>
    </div>
  );
}

export default App;
