import React, { useState, useEffect } from "react";
import axios from "axios";

import "./style.scss";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [updateTask, setUpdateTask] = useState("");

  // タスク表示機能
  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/posts')
         .then(res => {setTodos(res.data)})
         .catch(res => console.log(res))
         .catch(res => console.log(res.data))
  },[])
  
  // タスク入力機能
  const handleNewTask = (e) => {
    console.log("イベント発火")
    axios.post('http://localhost:3001/api/v1/posts',
      {task: task}
    ).then(response => {
      console.log("registration response", response.data)
      setTodos((todos) => [...todos, { 
        task: response.data.task, 
        isCompleted: response.data.isCompleted
      }])
      resetTextField()
    }).catch(error => {
      console.log("registration error", error)
    }).catch(data => {
      console.log(data)
    })
    e.preventDefault()
  };

  const resetTextField = () => {
    setTask('')
  }

  // タスク追加機能
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (task === "") return;
  //   setTodos((todos) => [...todos, { task, isCompleted: false }]);
  //   setTask("");
  // };
  
  // タスク更新機能
  const handleUpdateTask = id => {
    let newTodos = todos.map((todo,todoId) => {
      if(todoId  === id){
          todo.isCompleted = !todo.isCompleted
      }
      return todo;
    })
    setTodos(newTodos);
  }
  
  // タスク削除機能
  const handleRemoveTask = id => {
    const newTodos = [...todos]
    newTodos.splice(id,1)
    setTodos(newTodos)
  }

  return (
    <div>
      <h1>ToDo List</h1>

      <form onSubmit={handleNewTask}>
        <input
          type="text"
          name="task"
          value={task}
          placeholder="Add New Task"
          onChange={(e) => setTask(e.target.value)}
        />
        : 
        <button
          type="submit"
          variant='contained'
          color='primary'
        >
          Add Task
        </button>  
      </form>

      <ul>
        {todos.map((todo) => (
          <li 
            key={todo.id}
            component='li'
            style={ todo.isCompleted === true ? {textDecorationLine: 'line-through'}:{}}
          >
            <input  type="checkbox"
                    onClick={ () => handleUpdateTask(todo.id)}
            />
            {todo.task}
            <button onClick={ () => handleRemoveTask(todo.id) }> × </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;