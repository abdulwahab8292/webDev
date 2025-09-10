"use strict";
function greetAgain(user) {
    console.log(`Hello, my name is ${user.firstname} ${user.lastname}! I am ${user.age} years old.`);
}
let userDet = {
    firstname: "John",
    lastname: "Doe",
    age: 30
};
greetAgain(userDet);
let user2 = {
    // name: "xyz" --> only abdul and wahab are allowed
    name: "abdul",
    age: 30,
    address: {
        city: "New York",
        country: "USA",
        zipcode: 10001
    }
};
function isLegal(user) {
    return user.age >= 18 ? true : false;
}
console.log(isLegal(user2)); // should return true
let newUser = {
    name: "John Doe",
    age: 30,
    address: {
        city: "New York",
        country: "USA",
        zipcode: 10001
    }
};
let officeUser = {
    officeName: "ABC Corp",
    address: {
        city: "Los Angeles",
        country: "USA",
        zipcode: 90001
    }
};
console.log(newUser.address.city); // should return "New York"
console.log(officeUser.address.city); // should return "Los Angeles"
