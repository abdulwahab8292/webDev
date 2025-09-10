import { useState, useEffect } from "react";

//mounting, re-rendering, unmounting
function Counter() {
  const [count, setCount] = useState(0);

  //Hooking into the lifecycle events of react
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + 1);
      console.log("Counter is still mounted");
    }, 1000);

    return function () {
      console.log("counter unmounted");
      clearInterval(interval);
    };
    //only valid for unmounting empty dependency array
  }, []);

  return (
    <div>
      <div>{count}</div>
    </div>
  );
}
export default Counter;
