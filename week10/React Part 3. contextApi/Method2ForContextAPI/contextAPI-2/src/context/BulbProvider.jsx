import BulbContext from "./BulbContext";
import { useState } from "react";
function BulbProvider({ children }) {
  const [isBulbOn, setIsBulbOn] = useState(true);
  return (
    <BulbContext.Provider
      value={{
        isBulbOn,
        setIsBulbOn,
      }}
    >
      {children}
    </BulbContext.Provider>
  );
}
export default BulbProvider;
