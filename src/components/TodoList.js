import React, { useState, useEffect } from "react";
import axios from "axios";

import "./TodoList.scss";

import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Grid from '@mui/material/Grid';
// import Divider from '@mui/material/Divider';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  //実装中
  // const [updateTask, setUpdateTask] = useState("");

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
  const handleSubmit = (event) => {
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
    event.preventDefault();
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

  //実装中
  // const updateTask = (id) => {
  //   if (updatetask === "") return;
  //   axios.pathe(`http://localhost:3001/api/v1/posts/${id}`,
  //   {
  //     task: updatetask
  //   }
  //   ).then(res => {
  //     setTodos(todos.filter(todo => todo.id !== id))
  //     console.log(res.data)
  //   }).catch(data =>  {
  //     console.log(data)
  //   })
  // }
  
  // 達成状況 更新機能
  const handleUpdateTask = (id) => {
    axios.patch(`http://localhost:3001/api/v1/posts/${id}`,
      {
        task: "Compreted"
      }
    ).then(res => {
      console.log("update")
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
    <Box className="todo-list" flexItem="bool">
    <Container maxWidth="sm">    
      <Box className="todo-list__form" sx={{ m: "2rem" }}>
        <form onSubmit={ handleSubmit }>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                width='100%'
                variant="filled"
                label="Add New Task"
                size="small"
                value={task}
                onChange={ handleNewTask }
              /> 
            </Grid>
            <Grid item xs={4}>
              <Button type="submit" variant="contained" size="normal">Add Task</Button>
            </Grid>
          </Grid>
        </Box>
        </form>
      </Box>
    </Container>

    <List sx={{maxWidth: "100%", bgcolor: 'background.paper'  }}>
      <Box className="todo-list__tasks" sx={{ m: "2rem" }}>
          {todos.map((todo) => (
            <ListItem 
              key={todo.id}
              component='li'
              style={ todo.isCompleted === true ? {textDecorationLine: 'line-through'}:{}}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0}>
                  <Grid item xs={8} direction="column" alignItems="center">
                    {todo.task}
                  </Grid>
                  <Grid item xs={2}> </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      variant="outlined"
                      size="small"
                      onClick={() => handleUpdateTask(todo.id)}
                    >
                      <CheckBoxIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      variant="outlined"
                      size="small"
                      onClick={() => handleRemoveTask(todo.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            </ListItem>
          ))}
      </Box>
    </List>  
    </Box>
  );
}

export default TodoList;