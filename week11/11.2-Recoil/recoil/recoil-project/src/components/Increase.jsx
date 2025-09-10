import { useSetRecoilState } from "recoil";
import { counterAtom } from "../store/atoms/CounterAtom";

function Increase() {
  const setCount = useSetRecoilState(counterAtom);
  return (
    <button
      onClick={() => setCount((c) => c + 1)}
      className="bg-green-500 px-4 py-2 rounded-lg font-semibold text-white shadow-md hover:bg-green-600 focus:ring focus:ring-green-300"
    >
      Increase
    </button>
  );
}

export default Increase;
