interface User {
    name: string,
    age: number
}
function sumOfAge(user1: User, user2: User): number {
    return user1.age + user2.age;
}

const user1: User = {
    name: "John Doe",
    age: 30
};

const user2: User = {
    name: "Jane Smith",
    age: 28
};

console.log(sumOfAge(user1, user2)); // Output: 58