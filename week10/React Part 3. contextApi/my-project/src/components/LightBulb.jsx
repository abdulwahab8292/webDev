import { useContext } from "react";
import BulbContext from "../Context/BulbContext";
function LightBulb() {
  const { BulbOn } = useContext(BulbContext);
  return (
    <div>
      <p>Light is {BulbOn ? "On" : "Off"}</p>
    </div>
  );
}
export default LightBulb;
