import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import useCounter from "./components/CustomHook";
import useFetch from "./components/useFetchHook";
import usePrev from "./components/usePrev";

function App() {
  const { count, incrementCount } = useCounter();
  const [count2, setCount2] = useState(0);

  const prevState = usePrev(count2);

  const prevCount = usePrev(count);
  const { data, loading } = useFetch(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  return (
    <div>
      <div>
        <div>Current count: {count}</div>
        <button onClick={incrementCount}>Increment Count</button>
      </div>
      <div>{loading ? "Loading..." : JSON.stringify(data)}</div>

      <div>
        <div>current count: {count2}</div>
        <button onClick={() => setCount2((prevState) => prevState + 1)}>
          Increment Count
        </button>
        <div>Previous Count: {prevState}</div>
      </div>
    </div>
  );
}

export default App;
