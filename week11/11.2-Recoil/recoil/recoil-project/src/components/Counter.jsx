import Increase from "./Increase";
import Decrease from "./Decrease";
import CurrentCount from "./CurrentCount";
import IsEven from "./isEven";

function Counter() {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Counter</h1>
        <p className="text-lg text-gray-400 mt-2">A beautiful counter app using Recoil!</p>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <CurrentCount />
        <IsEven />
      </div>
      <div className="flex space-x-4">
        <Increase />
        <Decrease />
      </div>
    </div>
  );
}

export default Counter;
