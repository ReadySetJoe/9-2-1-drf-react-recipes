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
    return (
      <>
        <div className="card">
          <article className="card-body">
            <h4 className="card-title mb-4 mt-1">Sign in</h4>
            <form>
              <div className="form-group">
                <label>Your email</label>
                  <input name="" className="form-control" placeholder="Email" type="email"/>
              </div> 
              <div className="form-group">
                <label>Your password</label>
                  <input className="form-control" placeholder="******" type="password"/>
              </div>  
              <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block"> Login  </button>
                  <a href="" className="btn btn-outline-primary btn-block">Sign up</a>
              </div>                                                            
            </form>
          </article>
        </div>
      </>
    )
  }
}

export default Login