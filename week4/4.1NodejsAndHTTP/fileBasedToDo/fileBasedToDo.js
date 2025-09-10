const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

const filePath = "toDosData.json";

// Helper function to read todos from the file
function readTodos() {
  if (
    !fs.existsSync(filePath) ||
    fs.readFileSync(filePath, "utf8").trim() === ""
  ) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

// Helper function to write todos to the file
function writeTodos(todos) {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
}

// Function to generate a new ID based on the number of todos
function generateId(todos) {
  return todos.length > 0 ? todos[todos.length - 1].id + 1 : 1; // Incremental ID
}

// Define the program metadata
program
  .name("todo")
  .description("CLI to add, store & delete ToDos")
  .version("0.1.0");

// Add ToDo command
program
  .command("add")
  .description("Add a new ToDo task")
  .argument("<task>", "Task to be added")
  .action((task) => {
    const todos = readTodos(); // Read existing todos
    const newId = generateId(todos); // Generate a new ID for the task
    todos.push({ id: newId, task, done: false }); // Add new task with ID
    writeTodos(todos); // Save updated todos to file
    console.log(`Added new task: "${task}" with ID: ${newId}`); // Output success message
  });

// Parse command-line arguments
program.parse();
