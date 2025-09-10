import { useEffect } from "react";

const Counter = ({ count, setCount }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [setCount]);

  return <div>{count}</div>;
};

export default Counter;
