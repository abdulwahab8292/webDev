import React from "react";
import { useRecoilValue } from "recoil";
import { counterAtom } from "../store/atoms/CounterAtom";

function CurrentCount() {
  const count = useRecoilValue(counterAtom);
  return (
    <div className="text-6xl font-bold text-blue-400">
      {count}
    </div>
  );
}

export default CurrentCount;
