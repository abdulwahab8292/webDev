"use strict";
//similar to c++ ans is a javascript function to create key value pair
const usersDetail = new Map();
usersDetail.set("Abdul@123", { name: "Abdul", age: 12, email: "abdul121122@gmail.com" });
const user1Detail = usersDetail.get("Abdul@123");
console.log(user1Detail);
const userDetail2 = new Map();
userDetail2.set("Abdul@13", { name: "Ab", age: 13, email: "abcd@gmail.com" });
const user2Detail2 = userDetail2.get("Abdul@13");
console.log(user2Detail2);
