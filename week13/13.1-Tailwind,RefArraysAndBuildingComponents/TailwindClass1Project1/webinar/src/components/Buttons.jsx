function Buttons({
    disabled,
    buttonData
}) {
    return (
        <div>
            <button 
                type="button"
                disabled={disabled}
                className={`text-white px-7 py-2 rounded-md pointer ${disabled ? "bg-blue-200" : "bg-green-400"}`}
            >
                {buttonData}
            </button>
        </div>
    );
}

export default Buttons;
