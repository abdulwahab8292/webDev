function sum(a, b) {
  return a + b;
}
let ans = sum(20, 30);
console.log(ans);
// ans = 50

ans = sum("20", 30);
// string concatenation takes place in this case
console.log(
  `string concatenation occurs when we do "20" + 30 and thus op: ${ans}`
);
