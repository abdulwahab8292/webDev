import { MdHomeFilled } from "react-icons/md";
import { GrSettingsOption } from "react-icons/gr";
import { FaUsersCog } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { FaPeopleRoof } from "react-icons/fa6";
import webinarIcon from '../assets/webinar-icon.svg'; // Import the SVG file
import profileImage from '../assets/profile.jpg';
import { PiVideoConferenceThin } from "react-icons/pi";

export const Sidebar = () => {
    return (
        <ul className="w-72 border shadow-lg h-screen">
            <li className="text-white flex items-center ml-3 justify-between mt-5 mb-3">
                <div className="bg-blue-700 flex items-center gap-1 p-2 px-[6px] rounded-[10px]">
                    <PiVideoConferenceThin className="text-green-400 h-5 w-5 ml-1"/>
                    <div className="mr-2">Webinar<span className="text-green-400">.gg</span></div>
                </div>
                <img src={profileImage} alt="Profile" className="rounded-[6px] h-10 w-10 outline outline-2 outline-blue-700 mr-4"/>
            </li>
            
            <li className="transition-all duration-200 flex items-center p-2 hover:bg-slate-200 rounded-md hover:text-blue-700 hover:font-semibold mb-2 mx-3">
                <div className="flex-grow">Home</div>
                <MdHomeFilled className="mr-3" />
            </li>
            
            <li className="transition-all duration-200 flex items-center p-2 hover:bg-slate-200 rounded-md hover:text-blue-700 hover:font-semibold mb-2 mx-3">
                <div className="flex-grow">Webinars</div>
                <FaPeopleRoof className="mr-4" />
            </li>
            <li className="transition-all duration-200 flex items-center p-2 hover:bg-slate-200 rounded-md hover:text-blue-700 hover:font-semibold mb-2 mx-3">
                <div className="flex-grow">Billing</div>
                <FaCreditCard className="mr-4 items-baseline" />
            </li>
            <li className="transition-all duration-200 flex items-center p-2 hover:bg-slate-200 rounded-md hover:text-blue-700 hover:font-semibold mb-2 mx-3">
                <div className="flex-grow">User Management</div>
                <FaUsersCog className="mr-4" />
            </li>
            <li className="transition-all duration-200 flex items-center p-2 hover:bg-slate-200 rounded-md hover:text-blue-700 hover:font-semibold mb-2 mx-3">
                <div className="flex-grow">Settings</div>
                <GrSettingsOption className="mr-4" />
            </li>
        </ul>
    );
};

export default Sidebar;
