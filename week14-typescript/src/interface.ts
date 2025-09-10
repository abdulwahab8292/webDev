interface usertype  {
    firstname: string
    lastname: string
    age: number
}

function greetAgain(user:usertype):void {
    console.log(`Hello, my name is ${user.firstname} ${user.lastname}! I am ${user.age} years old.`);
}
let userDet:usertype = {
    firstname: "John",
    lastname: "Doe",
    age: 30
}
greetAgain(userDet);

interface usertype2{
    name:"abdul" | "wahab";
    age: number;
    address : {
        city: string,
        country : string,
        zipcode: number
    }
}

let userN:usertype2 = {
   // name: "xyz" --> only abdul and wahab are allowed
    name: "abdul",
    age: 30,
    address: {
        city: "New York",
        country: "USA",
        zipcode: 10001
    }
}
function isLegal(user:usertype2) : boolean {
    return user.age>=18 ? true : false;
}

console.log(isLegal(userN)); // should return true

//nested interface
interface Address{
    city: string,
    country: string,
    zipcode: number
}
interface newUserType{
    name: string;
    age: number;
    address: Address
}
interface officeAddress{
    officeName:string,
    address: Address
}

let newUser:newUserType = {
    name: "John Doe",
    age: 30,
    address: {
        city: "New York",
        country: "USA",
        zipcode: 10001
    }
}

let officeUser:officeAddress = {
    officeName: "ABC Corp",
    address: {
        city: "Los Angeles",
        country: "USA",
        zipcode: 90001
    }
}

console.log(newUser.address.city); // should return "New York"

console.log(officeUser.address.city); // should return "Los Angeles"