import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";


import Navbar from "./navbar/Navbar";
import ProjectList from "./components/ProjectList";
import ProjectDetails from "./components/ProjectDetails";

class App extends Component {
  render() {
    return (
      <div className="App">
      <Navbar/>
        <Switch>
          <Route exact path="/projects" component={ProjectList}/>
          <Route exact path="/projects/:id" component={ProjectDetails} />
        </Switch>
      </div>
    );
  }
}

export default App;