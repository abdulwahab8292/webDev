import { useState, useEffect, useRef } from "react";

function Clock() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  // let timer=0;---> this is wrong, we cant use raw variable as they gets reinitialized after every rerender
  // useEffect(() => {

  //   if (isRunning) {
  //     timer = setTimeout(() => setCount((prevCount) => prevCount + 1), 1000);
  //   }
  //   return () => clearTimeout(timer);
  // }, [isRunning, count]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setTimeout(
        () => setCount((prevCount) => prevCount + 1),
        1000
      );
    }
    return () => clearTimeout(timerRef.current);
  }, [isRunning, count]);

  const startClock = () => {
    setIsRunning(true);
  };
  //-----------------------------------------------
  /* we cant access timer variable because it is scoped to useEffect hook only so we will use useRef
    const stopClock = () => {
      setIsRunning(false);
      clearTimeout(timer);
    };
  */
  //-----------------
  const stopClock = () => {
    setIsRunning(false);
    clearTimeout(timerRef.current); // Access the timer reference
  };
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="w-8 mx-auto mt-3 ">{count}</div>
      <div className="flex gap-3 items-stretch">
        <button
          onClick={startClock}
          className="border rounded-md p-2 bg-blue-500 hover:bg-blue-600 text-white"
        >
          Start
        </button>
        <button
          onClick={stopClock}
          className="border rounded-md p-2 bg-blue-500 hover:bg-blue-600 text-white"
        >
          Stop
        </button>
      </div>
    </div>
  );
}

export default Clock;
