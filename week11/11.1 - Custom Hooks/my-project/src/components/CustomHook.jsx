import { useState } from "react";
function useCounter() {
  const [count, setCount] = useState(0);
  function incrementCount() {
    setCount((c) => c + 1);
  }
  return {
    count,
    incrementCount,
  };
}
export default useCounter;
