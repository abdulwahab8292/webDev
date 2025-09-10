"use strict";
let x = 1;
// x = "abdul"---> Type 'string' is not assignable to type 'number'
console.log(x);
function greet(firstName) {
    console.log("Hello, " + firstName);
}
let y = "abdul";
greet(y);
function sum(num1, num2) {
    return num1 + num2;
}
let num1 = 1;
let num2 = 2;
let ans = sum(num1, num2);
console.log(ans);
function main(delayedFunc) {
    setTimeout(delayedFunc, 1000);
}
let myFunc = function () {
    console.log("Hello, World!");
};
main(myFunc);
//Arrow function
let greet2 = () => {
    console.log("Hii");
};
