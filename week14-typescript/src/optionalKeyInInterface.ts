interface userType3  {
    name : "abdul" | "wahab";
    age : number;
    address ?: { //address?  ----> this is optional
        city: string,
        country: string,
        postalCode: number
    }
}
let user4 : userType3 = {
    name: "abdul",
    age: 30,
}
console.log(user4)
