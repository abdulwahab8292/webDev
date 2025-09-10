import { evenSelector } from "../store/atoms/CounterAtom";
import { useRecoilValue } from "recoil";

function IsEven() {
  const isEven = useRecoilValue(evenSelector);
  return (
    <div className="text-lg font-medium">
      <span
        className={`px-2 py-1 rounded-lg ${
          isEven ? "bg-green-300 text-green-800" : "bg-red-300 text-red-800"
        }`}
      >
        {isEven ? "Even" : "Odd"}
      </span>
    </div>
  );
}

export default IsEven;
