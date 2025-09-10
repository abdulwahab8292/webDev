"use strict";
class Manager {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.department = "HR";
    }
    isLegal() {
        return this.age > 18;
    }
}
let manager1 = new Manager("John", 30);
console.log(manager1.isLegal()); // true
