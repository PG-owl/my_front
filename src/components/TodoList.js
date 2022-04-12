import React, { useState, useEffect } from "react";
import axios from "axios";

import "./style.scss";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  // タスク表示機能
  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/posts')
         .then(res => {setTodos(res.data)})
         .catch(error => console.log(error))
  },[]);
  
  // タスク入力機能
  const handleNewTask = (e) => {
    setTask(e.target.value)
  };

  // タスク追加機能
  const handleSubmit = () => {
    if (task === "") return;
    axios.post('http://localhost:3001/api/v1/posts', {
      task: task
    })
    .then(res => {
      console.log(res.data)
      setTodos([...todos, { 
        task: res.data.task
      }])
      setTask('');
    })
    .catch(error => {console.log(error)
    })
    task.preventDefault();
  };

  // タスク削除機能
  const handleRemoveTask = (id) => {
    axios.delete(`http://localhost:3001/api/v1/posts/${id}`)
    .then(res => {
      setTodos(todos.filter(todo => todo.id !== id))
      console.log("delete")
    })
    .catch(data => {console.log(data)
    })
  };
  
  // 達成状況 更新機能
  const handleUpdateTask = (id) => {
    axios.patch(`http://localhost:3001/api/v1/posts/${id}`,
      {
        isCompleted: !isCompleted
      }
    ).then(res => {
      let newTodos = todos.map(todo => {
        if(todo.id === res.data.id){
          return res.data;
        }else{
          return todo;
        }
      })
      setTodos(newTodos)
    }).catch(error => console.log(error))
  };

  return (
    <div>
      <h1>ToDo List</h1>

      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          value={task}
          placeholder="Add New Task"
          onChange={ handleNewTask }
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
            <input type="checkbox"
                   onClick={ () => handleUpdateTask(todo.id) } />
            {todo.task}
            <button onClick={ () => handleRemoveTask(todo.id) }> x </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;