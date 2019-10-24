import React from 'react';
import axios from 'axios';
import './App.css';
import Login from './Login';

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
    this.handleDelete = this.handleDelete.bind(this);
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
        recipes: recipes,
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

  handleDelete(recipe) {
    axios.delete(`/api/v1/recipes/${recipe.id}/`)
    .then(res => {
      console.log(res)
      let recipes = [...this.state.recipes]
      let ndx = recipes.indexOf(recipe)
      recipes = recipes.splice(ndx) 
      this.setState({recipes})
    })
    .catch(error => {
      console.log(error)
    })
  }


  render() {
    let recipes = this.state.recipes.map(recipe => (
      <li key={recipe.id} className='recipe-li'>
        <p>{recipe.title}</p> by <p>{recipe.created_by}</p><br/>
        <img src={recipe.image} alt={recipe.title} width="200" className='recipe-img'/>
        <button onClick={() => this.handleDelete(recipe)} className='del-btn'>x</button>
      </li>
    ));
    return (
      <React.Fragment>

          <header className='d-flex justify-content-between align-items-center border-bottom'>
            <i>The kitchen is yours, chef!</i>
            <a href="/"><h1 className='text-uppercase'>Batch Maker</h1></a>
              <div className='user-actions'>
                <li>+</li>
                <li><Login/></li>
              </div>
          </header>

        <div className='container'>
          <div className='row'>

            <nav className='d-none d-md-flex col-3 flex-column border-right'>
              <div>My Recipes</div>
              <div>Public Recipes</div>
              {/* <div>Popular Recipes</div> */}
              <div>My Favorite Recipes</div>
              {/* <div>My Pantry</div> */}
            </nav>

            <div className='col-9'>
              <div>My Recipes
                <ul>
                  {recipes}
                </ul>
              </div>
              <div>Public Recipes</div>
              {/* <div>Popular Recipes</div> */}
              <div>My Favorite Recipes</div>
              {/* <div>My Pantry</div> */}

            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default App;
