import React from 'react';
import axios from 'axios';
import './App.css';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let user = {
      username: this.state.username,
      password: this.state.password,
    }

    axios.post('api/v1/rest-auth/login/', user)
    .then(res => {
      console.log(res);
      localStorage.setItem('my-app-key',res.data.key);
      this.setState({loggedIn: true})
    })
    .catch(error => {
      console.log(error)
    })

  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render () {
    let form = null
    if (this.state.loggedIn) {
      return <p>Hello, {this.state.username}</p>
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='username' value={this.state.username} onChange={this.handleChange}/><br/>
          <input type='password' name='password' value={this.state.password} onChange={this.handleChange}/><br/>
          <button>Log in</button>
        </form>
      )
    }
  }
}

export default Login