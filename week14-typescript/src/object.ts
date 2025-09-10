let user = {
    name: "John Doe",
    age: 30,
    city: "New York",
    greet: function() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

function greetUser(user:{
    name: string,
    age: number,
    city: string,
    greet?: () => void
}){
    console.log(`Hello, my name is ${user.name} and I am ${user.age} years old.`);
    if(user.greet){
        user.greet();
    }
}

greetUser(user);