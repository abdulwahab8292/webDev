import { useState } from 'react';
import Buttons from './Buttons'; 
import Description from './Description';

function Form({ type, placeholder }) {
    const [emailData, setEmail] = useState({
        email: "",
        dob: null,
    });
    const [buttonData, setButtonData] = useState({
        disabled: true,
        text: "Continue",
    });
    const [description, setDescription] = useState("Please confirm your birth year. This data will not be stored.");

    const handleChange = (e) => {
        const email = e.target.value;
        setEmail({...emailData, email: email});
        setButtonData({
            disabled: !(isValidEmail && isValidDate),
            text: "Continue",
        });
    };

    return (
        <div className="flex flex-col items-center justify-center">
            {description && <Description description={description} />}
            <input 
                type={type} 
                name="email" 
                value={emailData.email} 
                placeholder={placeholder} 
                onChange={handleChange} 
                className="bg-blue-500 rounded-md px-7 py-2 outline-none"
            />
            <Buttons 
                disabled={buttonData.disabled} 
                buttonData={buttonData.text} 
            />
        </div>
    );
}

export default Form;
