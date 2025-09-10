import Counter from "./components/Counter";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-gray-900 text-white">
        <Counter />
      </div>
    </RecoilRoot>
  );
}

export default App;
