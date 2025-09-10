import React from 'react';
interface IbuttonProps {
    variant: "primary" | "secondary";
    onClick?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
    text: string;
}
const variantClass = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
    secondary: "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded",
}
const Button: React.FC<IbuttonProps> = ({ variant, onClick, disabled, children, text }) => {
    return (
        <button
            className={variantClass[variant]}
            onClick={onClick}
            disabled={disabled}
        >
            {children && <div>{children}</div>}
            {text}
      
        </button>
    );
}
export default Button;