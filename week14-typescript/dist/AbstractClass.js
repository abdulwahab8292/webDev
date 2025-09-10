"use strict";
class customer {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    DisplayInfo() {
        return `Name: ${this.name}, Age: ${this.age}`;
    }
}
class premiumCustomer extends customer {
    constructor(name, age, noOfPurchases) {
        super(name, age);
        this.noOfPurchases = noOfPurchases;
    }
    getDiscount() {
        if (this.noOfPurchases > 10) {
            return 10;
        }
        return 0;
    }
}
let premiumCust = new premiumCustomer("John Doe", 30, 15);
console.log(premiumCust.getDiscount());
