//Write a function that takes a user as an input and greets them with their name and age

function greetUser(user) {
  return `Hello, ${user.name}! You are ${user.age} years old.`;
}

// Example usage:
const user = { name: "John", age: 30 };
console.log(greetUser(user)); // Output: Hello, John! You are 30 years old.
