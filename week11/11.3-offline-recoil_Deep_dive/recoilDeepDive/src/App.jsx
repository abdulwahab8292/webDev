import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import {
  networkAtom,
  jobsAtom,
  messagingAtom,
  notificationAtom,
  totalNotificationSelector,
} from "../src/store/AtomCount";
import { useRecoilValue, useRecoilState } from "recoil";

function App() {
  const networkNotificationCount = useRecoilValue(networkAtom);
  const messagingNotificationCount = useRecoilValue(messagingAtom);
  const notificationCount = useRecoilValue(notificationAtom);
  const jobsNotificationCount = useRecoilValue(jobsAtom);
  const totalNotificationCount = useRecoilValue(totalNotificationSelector);

  return (
    <div className="mt-2 flex gap-1">
      <button className="border border-black p-1 rounded-[3px]">Home</button>
      <button className="border border-black p-1 rounded-[3px]">
        My Network {networkNotificationCount > 99 ? "99+" : networkNotificationCount}
      </button>
      <button className="border border-black p-1 rounded-[3px]">
        Messaging {messagingNotificationCount}
      </button>
      <button className="border border-black p-1 rounded-[3px]">
        Notification {notificationCount}
      </button>
      <button className="border border-black p-1 rounded-[3px]">
        Me {totalNotificationCount}
      </button>
    </div>
  );
}

export default App;
