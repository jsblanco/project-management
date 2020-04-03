import React, { Component } from "react";
import axios from "axios";

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "", isShowing: false }; // will help us to toggle addtask form
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const project = this.props.theProject._id; 

    
    axios
      .post("http://localhost:4000/api/tasks", {
        title,
        description,
        project
      })
      .then(() => {
        // after submitting the form, retrieve project one more time so the new task is displayed as well
        this.props.getTheProject();
        this.setState({ title: "", description: "" });
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  toggleForm = () => {
    if (!this.state.isShowing) {
      this.setState({ isShowing: true });
    } else {
      this.setState({ isShowing: false });
    }
  };

  showAddTaskForm = () => {
    if (this.state.isShowing) {
      return (
        <div>
          <h3>Add Task</h3>
          <form onSubmit={this.handleFormSubmit}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={e => this.handleChange(e)}
            />

            <label>Description:</label>
            <textarea
              name="description"
              value={this.state.description}
              onChange={e => this.handleChange(e)}
            />

            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <hr />
        <button onClick={() => this.toggleForm()}> Add task </button>
        {this.showAddTaskForm()}
      </div>
    );
  }
}

export default AddTask;