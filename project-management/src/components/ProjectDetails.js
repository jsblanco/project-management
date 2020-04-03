import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import EditProject from "./EditProject";
import AddTask from "./tasks/AddTasks";

class ProjectDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false
    };
  }

  componentDidMount() {
    this.getSingleProject();
  }

  getSingleProject = () => {
    const { params } = this.props.match;
    axios
      .get(`http://localhost:4000/api/projects/${params.id}`)
      .then(responseFromApi => {
        const theProject = responseFromApi.data;
        this.setState(theProject);
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderEditForm = () => {
    if (!this.state.title) {
      this.getSingleProject();
    } else {
      //{...props} => so we can have 'this.props.history' in Edit.js
      return (
        <EditProject
          theProject={this.state}
          getTheProject={this.getSingleProject}
          {...this.props}
        />
      );
    }
  };

  renderEditButton = () => {
    this.setState({ showEdit: !this.state.showEdit });
  };

  deleteProject = () => {
    const { params } = this.props.match;
    axios
      .delete(`http://localhost:4000/api/projects/${params.id}`)
      .then(() => {
        this.props.history.push("/projects");
        {
          /* !!! */
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderAddTaskForm = () => {
    if (!this.state.title) {
      this.getSingleProject();
    } else {
      // pass the project and method getSingleProject() as a props down to AddTask component
      return (
        <AddTask
          theProject={this.state}
          getTheProject={this.getSingleProject}
        />
      );
    }
  };

  render() {
    let editForm;
    if (this.state.showEdit) {
      editForm = this.renderEditForm();
    }
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        {this.state.tasks && this.state.tasks.length > 0 && <h3>Tasks</h3>}
        {/* map through the array of tasks and... */}
        {this.state.tasks &&
          this.state.tasks.map((task, index) => {
            return (
              <div key={index}>
                {/* ... make each task's title a link that goes to the task details page */}
                <Link to={`/projects/${this.state._id}/tasks/${task._id}`}>
                  {task.title}
                </Link>
              </div>
            );
          })}
        <div>
        <div>{this.renderAddTaskForm()}</div>
          <button onClick={() => this.renderEditButton()}>Edit project</button>
          <button onClick={() => this.deleteProject()}>Delete project</button>
          {editForm}
        </div>
        <Link to={"/projects"}>Back to projects</Link>
      </div>
    );
  }
}

export default ProjectDetails;
