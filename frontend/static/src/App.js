import React from 'react';
import axios from 'axios';
import './App.css';
import Login from './Login';
import Create from './Create';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      // username: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    axios.get('/api/v1/recipes/')
    .then(res => {
      this.setState({recipes:res.data});
    })
    .catch(error => {
      console.log(error)
    })
    axios.get('/api/v1/user/')
    .then(res => {
      localStorage.setItem({'key': res.data})
    })
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleDelete(recipe) {
    axios.delete(`/api/v1/recipes/${recipe.id}/`)
    .then(res => {
      let recipes = [...this.state.recipes]
      let ndx = recipes.indexOf(recipe)
      recipes.splice(ndx,1) 
      this.setState({recipes})
    })
    .catch(error => {
      console.log(error)
    })
  }


  render() {
    let recipes = this.state.recipes.map(recipe => (
      <li key={recipe.id} className='recipe-li m-2'>
        {/* <p>{recipe.title}</p> by <p>{recipe.created_by}</p><br/> */}
        <div className='recipe-img' style={{backgroundImage: `url(${recipe.image})`}}>
          <Create width="50" height="50"/>
        </div>
        <button onClick={() => this.handleDelete(recipe)} className='del-btn'>x</button>
      </li>
    ));

    return (
      <React.Fragment>

          <header className='border-bottom'>
            <div className='container-fluid d-flex justify-content-between align-items-center'>
              <i>The kitchen is yours, {`chef`}!</i>
              <a href="/"><h1 className='text-uppercase'>Batch Maker</h1></a>
              <div className='user-actions'>
                <li><Create width="25" height="25"/></li>
                <li><Login/></li>
              </div>
            </div>
          </header>

        <div className='container'>
          <div className='row'>
            <nav className='d-none d-md-flex col-3 flex-column border-right align-items-center justify-content-around'>
              <div className='border-bottom p-4'>Public Recipes</div>
              <div className='border-bottom p-4'>Popular Recipes</div>
              <div className='border-bottom p-4'>My Favorite Recipes</div>
              <div className='p-4'>My Pantry</div>
            </nav>

            <div className='col-9'>
              <div className='justify-content-between'>
                <top className='row'>
                  <div className='col-2'>My Recipes</div>
                  <div className='divider-bar col-8'></div>
                  <div className='col-2'>View All ></div>
                </top>
                <ul className='d-flex list-unstyled flex-wrap'>
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
