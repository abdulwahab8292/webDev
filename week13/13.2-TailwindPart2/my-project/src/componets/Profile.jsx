import React from 'react';
import profileImage from '../assets/profile.jpg'; // Adjust the path if necessary

function Profile() {
    return (
        <div className="bg-white shadow-md max-w-fit border p-3 flex justify-center items-center flex-col rounded-[3px] text-slate-500">
            <img src={profileImage} alt="Profile" height={"100px"} width={"100px"} className="rounded-[6px] my-3"/>
            <p className="font-bold mb-1 text-black">Eagle</p>
            <p>birdisbeautiful@gmail.com</p>
            <p className="mb-[5px]">1234567890</p>
            <p>Haryana, India</p>
        </div>
    );
}

export default Profile;
