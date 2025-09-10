"use strict";
function sum2(a, b) {
    if (typeof a === "string" && typeof b === "string") {
        return a.concat(b);
    }
    else if (typeof a === "number" && typeof b === "number") {
        return a + b;
    }
    else {
        throw new Error("Both inputs must be of the same type.");
    }
}
let a = 2;
let b = 3;
console.log(sum2(a, b));
// type stringOrNum = string | number;
// function sum(a: stringOrNum, b: stringOrNum) {
//     try {
//         if (typeof a === "string" && typeof b === "string") {
//             return a.concat(b);
//         } else if (typeof a === "number" && typeof b === "number") {
//             return a + b;
//         } else {
//             throw new Error("Both inputs must be of the same type.");
//         }
//     } catch (error) {
//         console.error(error.message);
//         // You can choose to handle the error further or return a default value
//         return null;
//     }
// }
