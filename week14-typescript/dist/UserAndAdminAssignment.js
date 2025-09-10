"use strict";
function getUserDetails(user) {
    if ('permissions' in user) {
        console.log("You are Admin and have permission of validation");
        console.log(`Name: ${user.details.name}, IP: ${user.details.ip}`);
    }
    else {
        console.log(`Name: ${user.name}, IP: ${user.ip}`);
    }
}
// Example usage:
const userA = { name: "Alice", ip: "192.168.1.1" };
const admin = { details: { name: "Bob", ip: "192.168.1.2" }, permissions: "all" };
getUserDetails(userA);
getUserDetails(admin);
