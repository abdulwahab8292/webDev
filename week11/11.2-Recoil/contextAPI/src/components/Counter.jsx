import { useState } from "react";
import Increase from "./Increase";
import Decrease from "./Decrease";
import CurrentCount from "./CurrentCount";
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center  bg-black text-white">
      <CurrentCount count={count} />
      <div className="flex mt-2 gap-3">
        <Increase setCount={setCount} />
        <Decrease setCount={setCount} />
      </div>
    </div>
  );
}
export default Counter;
