"use strict";
const votersList = [
    {
        firstName: 'abdul',
        lastName: "wahab",
        age: 19
    },
    {
        firstName: 'ali',
        lastName: "ahmed",
        age: 14
    },
    {
        firstName: 'usama',
        lastName: "ali",
        age: 16
    },
    {
        firstName: 'zainab',
        lastName: "ali",
        age: 22
    },
    {
        firstName: 'tushar',
        lastName: "ali",
        age: 10
    }
];
const eligibleVoters = votersList.filter((value) => value.age >= 18);
console.log(eligibleVoters);
