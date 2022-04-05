import React, { useState, useEffect } from "react";
import axios from "axios";

function TodoList() {
  const [todos, setTodo] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/posts')
         .then(res => {setTodo(res.data)})
  },[])
  
  // タスク入力機能
  const handleNewTask = (e) => {
    setTask(e.target.value);
  };

  // タスク追加機能
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task === "") return;
    setTodo((todos) => [...todos, { task, isCompleted: false }]);
    setTask("");
  };
  
  // タスク更新機能
  const handleUpdateTask = index => {
    let newTodos = todos.map((todo,todoIndex) => {
      if(todoIndex  === index){
          todo.isCompleted = !todo.isCompleted
      }
      return todo;
    })
    setTodo(newTodos);
  }
  
  // タスク削除機能
  // const handleRemoveTask = index => {
  //   const newTodos = [...todos]
  //   newTodos.splice(index,1)
  //   setTodo(newTodos)
  // }

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
          <li 
            key={index}
            style={ todo.isCompleted === true ? {textDecorationLine: 'line-through'}:{}}
          >
            {todo.task}
            <span onClick={ () => handleUpdateTask(index) }> × </span>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;