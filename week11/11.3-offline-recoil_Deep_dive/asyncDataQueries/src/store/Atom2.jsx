import {atom, selector} from "recoil";
import axios from "axios";
export const notifications = atom({
    key: "notifications", 
    default: selector({
        key : 'networkSelector',
        //async data queries
        get : async() =>{
            // await new Promise((resolve)=>{
            //     setTimeout(()=>{
            //         resolve();
            //     },5000); 
            // })
            const res = await axios.get("https://mocki.io/v1/0339d6fd-afb0-4d09-b7a0-7cc96239f6a3");
            return res.data;
        }
    })
});
  
  export const totalNotificationSelector = selector({
    key: "totalNotificationSelector",
    get: ({ get }) => {
      const allNotifications = get(notifications);
      return (
        allNotifications.networkAtom +
        allNotifications.jobsAtom +
        allNotifications.notificationAtom +
        allNotifications.messagingAtom
      );
    },
  });