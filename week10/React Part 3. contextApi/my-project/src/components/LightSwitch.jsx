import { useContext } from "react";
import BulbContext from "../Context/BulbContext";
function LightSwitch() {
  const { setBulbOn } = useContext(BulbContext);
  return (
    <div>
      <button
        onClick={() => {
          setBulbOn((bulbOn) => !bulbOn);
        }}
      >
        Toggle Light
      </button>
    </div>
  );
}
export default LightSwitch;
