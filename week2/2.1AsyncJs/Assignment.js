//Try to create a promisified version of setTimeout and fetch and fs.readfile
const fs = require("fs");
function setTimeoutPromisified(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
function callback() {
    console.log("3 seconds have passed");
}
  
  setTimeoutPromisified(3000).then(callback)
//in this code, there is no need 
// for a reject because the setTimeout function 
// does not have any built-in mechanism to fail or throw an error.

function fetchPromisified(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json()) 
            .then(data => resolve(data)) 
            .catch(error => reject(error)); 
    });
}

fetchPromisified("https://jsonplaceholder.typicode.com/todos/1")
    .then(data => console.log(data))
    .catch(error => console.error(error));


function readFilePromisified(path) {
    return new Promise((resolve,reject)=>{
        fs.readFile(path,(err,data)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        })
    })
}

readFilePromisified("a.txt")
    .then((data)=>console.log(data))
    .catch((error)=>console.error(error));