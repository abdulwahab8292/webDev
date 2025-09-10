function sum(a, b) {
  return a + b;
}

function doOperation(a, b, op) {
  let val = op(a, b);
  return val;
}
//Not a good practice of naming argument same as function name
// function doOperation2(a, b, sum) {
//   let val = sum(a, b);
//   return val;
// }

const ans = doOperation(20, 30, sum);
console.log(ans);

//arrow function
const ans2 = doOperation(20, 30, (x, y) => sum(x, y));
console.log(ans2);

//Throws error
// const ans3 = doOperation(20, 30, 33);
// console.log(ans3);
