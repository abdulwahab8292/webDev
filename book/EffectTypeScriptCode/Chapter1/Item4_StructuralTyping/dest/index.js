"use strict";
function calculateLength(v) {
    return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
}
const v = { x: 3, y: 4, name: "Pythagoras" };
console.log(calculateLength(v)); // 
