import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import BulbContext from "./Context/BulbContext";
import Light from "./components/Light";
function App() {
  const [BulbOn, setBulbOn] = useState(true);

  return (
    <BulbContext.Provider value={{ BulbOn, setBulbOn }}>
      <Light />
    </BulbContext.Provider>
  );
}

export default App;
