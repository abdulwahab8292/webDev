let x: number = 1;
// x = "abdul"---> Type 'string' is not assignable to type 'number'
console.log(x);
function greet(firstName:string){
    console.log("Hello, " + firstName);
}
let y:string = "abdul";
greet(y); 

function sum (num1:number, num2:number): number{
    return num1 + num2;
}

let num1 : number = 1;
let num2 : number = 2;
let ans : number = sum(num1, num2);
console.log(ans);

function main(delayedFunc:()=>void){
    setTimeout(delayedFunc, 1000);
}

let myFunc = function():void{
    console.log("Hello, World!");
}

main(myFunc);

//Arrow function
let greet2 = () =>{
    console.log("Hii")
}