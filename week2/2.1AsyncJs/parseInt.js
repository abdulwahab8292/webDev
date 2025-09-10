function sum(a, b) {
  return parseInt(a) + parseInt(b);
}
//parseInt convert string into integer value if string is passed
let ans = sum("20", 30);
console.log(ans);
ans = sum("a", "b");

console.log(ans);
//output ---> NaN
