//bad approach
import { useState } from "react";
function Clock2() {
    const [currentCount, setCurrentCount] = useState(0);
    const [timer, setTimer] = useState(0);
    function startClock(){
        let value = setInterval(() =>{ 
            setCurrentCount((prevCount) => prevCount + 1);
        }, 1000);
        setTimer(value);
    }
    function stopClock(){
        clearInterval(timer);
    }
    return(
        <div>
            <h1>{currentCount}</h1>
            <button onClick={startClock}>Start</button>
            <button onClick={stopClock}>Stop</button>
        </div>

    )
}
export default Clock2;