/*A Promise in JavaScript is an object that represents the eventual 
completion (or failure) of an asynchronous operation and its 
resulting value.

A Promise is in one of these states:

pending: initial state, neither fulfilled nor rejected.
fulfilled: meaning that the operation was completed successfully.
rejected: meaning that the operation failed.
*/

function random(resolve) {
  setTimeout(resolve, 3000);
}
let p = new Promise(random);
function callback() {
  console.log("promise succeded");
}

p.then(callback);
