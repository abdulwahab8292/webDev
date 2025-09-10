interface People {
    name: string;
    age: number;
    isLegal: ()=> void
}

class Manager implements People {
    name : string;
    age : number;
    //Above 2 attributes are mandatory.
    department: string;
    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
        this.department = "HR";
    }
    isLegal(): boolean{
        return this.age>18;
    }
}
let manager1 = new Manager("John", 30);

console.log(manager1.isLegal()); // true