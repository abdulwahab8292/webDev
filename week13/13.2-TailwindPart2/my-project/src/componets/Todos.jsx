import { MdOutlineCalendarMonth } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";
import { useState } from "react";

function Todos() {
    
    return (
        <div className="flex bg-slate-300 w-fit p-2 rounded-md items-center">
            <MdOutlineCalendarMonth size={24} className="mr-2" />
            <span className="mr-2">{selectedDate ? formatDate(selectedDate) : "Select Date"}</span>
            <input type="date" className="outline-none bg-transparent border-0 text-black" onChange={handleDateChange} id="datePicker" />
            <RiArrowDownSLine size={24} className="ml-2 cursor-pointer" onClick={() => document.getElementById('datePicker').showPicker()} />
            <div className="flex items-center ml-2">
                <IoIosArrowRoundBack size={24} className="mr-1 cursor-pointer" />
                <IoIosArrowRoundForward size={24} className="ml-1 cursor-pointer" />
            </div>
        </div>
    );
}

export default Todos;
