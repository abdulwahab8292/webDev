import { useSetRecoilState } from "recoil";
import { counterAtom } from "../store/atoms/CounterAtom";

function Decrease() {
  const setCount = useSetRecoilState(counterAtom);
  return (
    <button
      onClick={() => setCount((c) => c - 1)}
      className="bg-red-500 px-4 py-2 rounded-lg font-semibold text-white shadow-md hover:bg-red-600 focus:ring focus:ring-red-300"
    >
      Decrease
    </button>
  );
}

export default Decrease;
