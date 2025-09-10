import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    {
      title: "Go to Gym",
      description: "Hit the gym regularly",
      done: false,
    },
  ]);

  function addTodo() {
    setTodos([
      ...todos,
      { title: "go to college", description: "Hit the college", done: false },
    ]);
  }
  return (
    <div>
      <h1>To-Do List</h1>
      <button onClick={addTodo}>Add Todo</button>
      {todos.map((todo, index) => (
        <div key={index}>
          <h2>{todo.title}</h2>
          <p>{todo.description}</p>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => toggleTodo(index)}
          />
          <button onClick={() => deleteTodo(index)}>Delete</button>
        </div>
      ))}
      <img src={reactLogo} alt="React Logo" />
      <img src={viteLogo} alt="Vite Logo" />
    </div>
  );
}

export default App;
