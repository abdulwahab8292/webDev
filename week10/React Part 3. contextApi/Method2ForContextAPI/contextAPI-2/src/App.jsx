import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import BulbProvider from "./context/BulbProvider";
import Bulb from "./components/Bulb";
function App() {
  return (
    <BulbProvider>
      <Bulb />
    </BulbProvider>
  );
}

export default App;
