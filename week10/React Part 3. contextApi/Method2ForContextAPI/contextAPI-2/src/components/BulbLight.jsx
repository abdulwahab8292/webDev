import BulbContext from "../context/BulbContext";
import { useContext } from "react";
function BulbLight() {
  const { isBulbOn } = useContext(BulbContext);

  return <div>Bulb is : {isBulbOn ? "On" : "Off"}</div>;
}
export default BulbLight;
