function setTimeoutSync(timeout) {
    const startTime = Date.now();
    while(1){
        const currentTime = new Date();
        if(currentTime - startTime >= timeout){
            break;
        }
    }
}
setTimeoutSync(4000);
console.log("Hello");
