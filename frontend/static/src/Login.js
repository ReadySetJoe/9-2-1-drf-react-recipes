import React from 'react';
import axios from 'axios';
import './Login.css';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      showLogin: false,
    };

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleShowLogin = this.handleShowLogin.bind(this);
    this.handleHideLogin = this.handleHideLogin.bind(this);
  }

  handleLoginSubmit = (e) => {
    e.preventDefault();

    let user = {
      username: this.state.username,
      password: this.state.password,
    }

    axios.post('api/v1/rest-auth/login/', user)
    .then(res => {
      console.log(res);
      localStorage.setItem('my-app-key',res.data);
      this.setState({loggedIn: true, showLogin: false})
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleSignUp = (e) => {

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

  handleShowLogin(e) {
    if (this.state.loggedIn) {
      axios.post('api/v1/rest-auth/logout/')
      .then(res => {
        localStorage.removeItem('my-app-key')
        this.setState({loggedIn: false})
      })
      .catch(error => {
        console.log(error)
      })
    } else {
      this.setState({showLogin: true})
    }
  }

  handleHideLogin(e) {
    this.setState({showLogin: false})
  }

  render () {
    let modal = null;
    if (this.state.showLogin) {
      modal = 
        <div className={this.state.showLogin ? "modal-selected" : "modal"}>
          <form className="modal-content animate" onSubmit={this.handleLoginSubmit} method="post">
            <div className="imgcontainer">
              <span onClick={this.handleHideLogin} className="close" title="Close Modal">&times;</span>
            </div>

            <div className="container">
              <label htmlFor="username"><b>Username</b></label>
              <input onChange={this.handleChange} type="text" placeholder="Enter Username" name="username" required/>

              <label htmlFor="password"><b>Password</b></label>
              <input onChange={this.handleChange} type="password" placeholder="Enter Password" name="password" required/>

              <button type="submit">Login</button>
              <button type="button" onClick={() => (this.handleSignUp)}>Sign Up</button>
              
              <label>
                <input onChange={this.handleChange} type="checkbox" name="remember"/> Remember me
              </label>
            </div>

            <div className="container" style={{backgroundColor:'#f1f1f1'}}>
              <button type="button" onClick={this.handleHideLogin} className="cancelbtn">Cancel</button>
              <span className="psw">Forgot <a href="/accounts/password_reset">password?</a></span>
            </div>
          </form>
        </div>
    }    
    return (
      <>
      <button onClick={this.handleShowLogin} className="logon-btn">{this.state.loggedIn ? "Logout" : "Login"}</button>
      {modal}
      </>
    )
  }
}

export default Login