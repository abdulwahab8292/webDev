
import viteLogo from "/vite.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { notifications, totalNotificationSelector } from "./store/Atom2";
import axios from "axios";
import TodoComponents from "./atomFamily/TodoComponents";

function App() {
  const [notificationCount, setNotificationCount] = useRecoilState(notifications);
  const totalNotificationCount = useRecoilValue(totalNotificationSelector);
  
  

  return (
    <div className="mt-2 flex gap-1">
      <button className="border border-black p-1 rounded-[3px]">Home</button>

      <button className="border border-black p-1 rounded-[3px]">
        My Network {notificationCount.networkAtom > 99 ? "99+" : notificationCount.networkAtom}
      </button>

      <button className="border border-black p-1 rounded-[3px]">
        Jobs {notificationCount.jobsAtom}
      </button>

      <button className="border border-black p-1 rounded-[3px]">
        Messaging {notificationCount.messagingAtom}
      </button>

      <button className="border border-black p-1 rounded-[3px]">
        Notifications {notificationCount.notificationAtom}
      </button>

      <button className="border border-black p-1 rounded-[3px]">
        Me {totalNotificationCount}
      </button>
      <br/>
      <div>---------------------------------------------------------------------------------------</div>
      <TodoComponents id={1}/>
      <TodoComponents id={2}/>
      <TodoComponents id={3}/>
      <TodoComponents id={1}/>
    </div>
  );
}

export default App;
