import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";


import Navbar from "./navbar/Navbar";
import ProjectList from "./components/ProjectList";
import ProjectDetails from "./components/ProjectDetails";
import TaskDetails from "./components/tasks/TaskDetails";

class App extends Component {
  render() {
    return (
      <div className="App">
      <Navbar/>
        <Switch>
          <Route exact path="/projects" component={ProjectList}/>
          <Route exact path="/projects/:id" component={ProjectDetails} />
          <Route exact path="/projects/:id/tasks/:taskId" component={TaskDetails} />
        </Switch>
      </div>
    );
  }
}

export default App;