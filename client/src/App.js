import React from "react";
import {Router} from "@reach/router";
import './App.css';
import Login from "./views/login";
import Registration from "./views/registration";
import ToDoPage from "./views/toDoPage";
import EditTask from "./views/editTask";

function App() {
  return (
    <div className="App">
      <Router>
        <Login default path={'/'}/>
        <Registration path={'/registration'}/>
        <ToDoPage path={'/myPlanner'}/>
        <EditTask path={'/myPlanner/:id'}/>
      </Router>
    </div>
  );
}

export default App;
