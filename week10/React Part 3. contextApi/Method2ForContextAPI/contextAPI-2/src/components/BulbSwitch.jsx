import BulbContext from "../context/BulbContext";
import { useContext } from "react";

function BulbSwitch() {
  const { setIsBulbOn } = useContext(BulbContext);
  return (
    <button onClick={() => setIsBulbOn((state) => !state)}>Toggle Bulb</button>
  );
}

export default BulbSwitch;
