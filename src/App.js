import React from "react";
import "./App.scss";
import TodoList from "./components/TodoList";
import TodoTitle from "./components/TodoTitle";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

function App() {
  return (
    <div style={{height: '100%'}}>
      <CssBaseline />
      <Container style={{ backgroundColor: "#0566", height: '100%', width: '100%' }} autoHeight>
        <TodoTitle />
        <TodoList />
      </Container>
    </div>
  );
}

export default App;