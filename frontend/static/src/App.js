import React from 'react';
import axios from 'axios';
import './App.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      image: null,
      preview: '',
      recipes: [],
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);

  }

  componentDidMount() {
    axios.get('/api/v1/recipes/')
    .then(res => {
      this.setState({recipes:res.data});
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('image', this.state.image);

    axios.post('/api/v1/recipes/', formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      let recipes = [...this.state.recipes];
      recipes.push(res.data);

      this.setState({
        title: '',
        image: null,
        preview: '',
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleImageChange(e) {
    let file = e.target.files[0];
    this.setState({image: file});
    
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({preview: reader.result})
    };

    reader.readAsDataURL(file);
  }


  render() {
    let recipes = this.state.recipes.map(recipe => (
      <li key={recipe.id}>
        <p>{recipe.title}</p> by <p>{recipe.created_by}</p>
        <img src={recipe.image} alt={recipe.title} width="200"/>
      </li>
    ));
    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">
            Hello, world!
            <br/><br/><br/>
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
            <ul>
              {recipes}
            </ul>
          </header>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
