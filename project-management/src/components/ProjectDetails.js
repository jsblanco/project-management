import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import EditProject from "./EditProject";

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
    axios.delete(`http://localhost:4000/api/projects/${params.id}`)
    .then( () =>{
        this.props.history.push('/projects'); {/* !!! */}

    })
    .catch((err)=>{
        console.log(err)
    })
  }


  render() {
    let editForm;
    if (this.state.showEdit) {
      editForm = this.renderEditForm();
    }
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        <div>
          <button onClick={()=>this.renderEditButton()}>Edit project</button>
          <button onClick={() => this.deleteProject()}>Delete project</button>
        </div>
        {editForm}
        <Link to={"/projects"}>Back to projects</Link>
      </div>
    );
  }
}

export default ProjectDetails;
