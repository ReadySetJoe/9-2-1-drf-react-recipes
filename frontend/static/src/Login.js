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
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('my-app-key', JSON.stringify(res.data));
      this.setState({showLogin: false})
      console.log(localStorage);
      console.log(this.state);
      window.location.reload()
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
    if (localStorage.getItem('user')) {
      axios.post('api/v1/rest-auth/logout/')
      .then(res => {
        localStorage.removeItem('my-app-key')
        localStorage.removeItem('user')
        window.location.reload()
      })
      .catch(error => {
        console.log(error)
      })
    } else {
      this.setState({showLogin: true})
    }
  }

  // handleForgottenPassword(e) {
  //   axios.post
  // }

  handleHideLogin(e) {
    this.setState({showLogin: false})
  }

  render () {
    let modal = null;
    if (this.state.showLogin) {
      modal = 
        <div className={this.state.showLogin ? "modal-selected" : "modal"}>
          <form className="modal-content animate p-3" onSubmit={this.handleLoginSubmit} method="post">
            <div className="imgcontainer">
              <span onClick={this.handleHideLogin} className="close" title="Close Modal">&times;</span>
            </div>
            

            <div className="m-auto">
              <label htmlFor="username"><b>Username:</b></label>
              <input className="m-2 w-100" onChange={this.handleChange} type="text" placeholder="Enter Username" name="username" required/><br/>

              <label htmlFor="password"><b>Password:</b></label>
              <input className="m-2 w-100" onChange={this.handleChange} type="password" placeholder="Enter Password" name="password" required/><br/>

              <button className="m-2 w-100 loginbtn" type="submit">Login</button>
              <button className="m-2 w-100 signupbtn" type="button" onClick={() => (this.handleSignUp)}>Sign Up</button>
              <span className="m-2 float-left psw"><button onClick={this.handleForgottenPassword}>Forgot password?</button></span>
              <label className='float-right'>
                <input className="m-1" onChange={this.handleChange} type="checkbox" name="remember"/> Remember me
              </label>
            </div>

            <div className="m-auto">
              <button type="button" onClick={this.handleHideLogin} className="cancelbtn">Cancel</button>
            </div>
          </form>
        </div>
    }    
    return (
      <>
      <button onClick={this.handleShowLogin} className="logon-btn">{localStorage.getItem('user') ? "Logout" : "Login"}</button>
      {modal}
      </>
    )
  }
}

export default Login