//bad approach
import { useState } from "react";
function Clock2() {
    const [currentCount, setCurrentCount] = useState(0);
    let timer = 0;
    function startClock(){
        timer = setInterval(() =>{ 
            setCurrentCount((prevCount) => prevCount + 1);
        }, 1000);
    }
    function stopClock(){
        clearInterval(timer);
    }
    return(
        <div>
            <h1>{currentCount}</h1>
            <button onClick={startClock}>Start</button>
            <button onClick={stopClock}>Stop</button>

            {/* In the above code, we are directly accessing the variable 'timer' which is not recommended. Instead, we should use useRef hook to store the timer ID and access it later. */}
        </div>

    )
}
export default Clock1Method1;