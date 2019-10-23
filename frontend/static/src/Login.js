import React from 'react';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    let user = {
      username: 'joe',
      email: '',
      password: 'joe',
    }

    axios.post('api/v1/rest-auth/login/', user)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error)
    })

  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <button>Log in</button>
      </form>
    )
  }
}

export default Login