import React, { useState } from "react";

function TodoList() {
  const initialState = [
    { task: "Learn vue.js", isCompleted: false },
    { task: "Learn React Hook", isCompleted: false },
    { task: "Learn Gatsby.js", isCompleted: false }
  ];

  const [todos, setTodo] = useState(initialState);
  const [task, setTask] = useState("");

  const handleNewTask = (e) => {
    setTask(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task === "") return;
    console.log({ task, isCompleted: true });
    console.log(...todos);
    setTodo((todos) => [...todos, { task, isCompleted: false }]);
    setTask("");
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <form onSubmit={handleSubmit}>
        Add Task :
        <input
          value={task}
          placeholder="Add New Task"
          onChange={handleNewTask}
        />
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;