const fs =- require("fs");
console.log("-----------top of the file-----------");
function readTheFile(resolve){
    console.log("--readTheFile Called--");
    setTimeout(function(){
        console.log("callback based setTimeout completed");
        resolve();
    },3000);
}
function setTimeoutPromisified(fileName) {
    console.log("setTimeoutPromisified called");
    return new Promise(readTheFile);
}
const p =setTimeoutPromisified();
function callback(){
    console.log("Timer is done");
}
p.then(callback);
console.log("--------end of the file---------");