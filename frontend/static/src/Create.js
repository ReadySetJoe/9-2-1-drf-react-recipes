import React from 'react';
import axios from 'axios';
import './Create.css';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      showCreate: false,
    };

    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleShowCreate = this.handleShowCreate.bind(this);
    this.handleHideCreate = this.handleHideCreate.bind(this);
    
  }

  handleCreateSubmit = (e) => {
    e.preventDefault();

    let user = {
      username: this.state.username,
      password: this.state.password,
    }

    axios.post('api/v1/rest-auth/Create/', user)
    .then(res => {
      console.log(res);
      localStorage.setItem('my-app-key',res.data.key);
      this.setState({loggedIn: true, showCreate: false})
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleSignUpSubmit = (e) => {

    e.preventDefault();

    axios.post('api/v1/rest-auth/registration/')
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error)
    })    
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleShowCreate(e) {
    this.setState({showCreate: true})
  }

  handleHideCreate(e) {
    this.setState({showCreate: false})
  }

  render () {
    let modal = null;
    if (this.state.showCreate) {
      modal = 
        <div className={this.state.showCreate ? "modal-selected" : "modal"}>
          <form onSubmit={this.handleSubmit}>
            Image Upload
            <br/><br/>
            Title: <input type='text' name='title' value={this.state.title} onChange={this.handleChange}/><br/><br/>
            Image: <input type='file' name='image' onChange={this.handleImageChange}/><br/><br/>
            {this.state.image ? (
              <img src={this.state.preview} alt='preview' width="200"/>
            ) : (
              null
            )}
            
            <button>Upload</button>
          </form>
        </div>
    }    
    return (
      <>
      <button onClick={this.handleShowCreate} className="logon-btn">{this.state.loggedIn ? "My Account" : "Create"}</button>
      {modal}
      </>
    )
  }
}

export default Create