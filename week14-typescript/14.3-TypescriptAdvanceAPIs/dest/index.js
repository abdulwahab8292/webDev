"use strict";
function sumOfAge(user1, user2) {
    return user1.age + user2.age;
}
const user1 = {
    name: "John Doe",
    age: 30
};
const user2 = {
    name: "Jane Smith",
    age: 28
};
console.log(sumOfAge(user1, user2)); // Output: 58
