abstract class customer{
    name: string;
    age: number;
    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }
    abstract getDiscount(): number;
    DisplayInfo(): string{
        return `Name: ${this.name}, Age: ${this.age}`;
    }
}

class premiumCustomer extends customer{
    noOfPurchases: number;
    constructor(name: string, age: number, noOfPurchases: number){
        super(name, age);
        this.noOfPurchases = noOfPurchases;
    }
    getDiscount(): number{
        if(this.noOfPurchases > 10){
            return 10
        }
        return 0;
    }
}

let premiumCust = new premiumCustomer("John Doe", 30, 15);
console.log(premiumCust.getDiscount());