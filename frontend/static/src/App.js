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

  handleFavorite(recipe) {
    axios.get('/api/v1/rest-auth/user', JSON.parse(localStorage.getItem('user')).username)
    .then(res => {
      recipe.users.add(res.data)
      console.log(recipe.users)
    })
    .catch(error => {
      console.log(error)
    })
    
  }

  makeRow(recipes) {
    return recipes.map(recipe => (
      <li key={recipe.id} className='recipe-li m-2'>
        {/* <p>{recipe.title}</p> by <p>{recipe.created_by}</p><br/> */}
        <div className='recipe-img' style={{backgroundImage: `url(${recipe.image})`}}>
          <Create width="50" height="50"/>
        </div>
        <button onClick={() => this.handleDelete(recipe)} className='del-btn'>x</button>
        <button onClick={() => this.handleFavorite(recipe)} className='fav-btn'>♥︎</button>
      </li>
    ));
  }


  render() {
    let recipes = [...this.state.recipes]
    let my_recipes = [...this.state.recipes].filter(recipe => recipe.created_by == localStorage.getItem('user_id'))
    let public_recipes = [...this.state.recipes].filter(recipe => !recipe.private)
    let popular_recipes = [...this.state.recipes].filter(recipe => recipe) // still need to implement 'favorites list'
    let favorite_recipes = [...this.state.recipes].filter(recipe => recipe) // still need to implement 'favorites list'

    recipes = this.makeRow(recipes)
    my_recipes = this.makeRow(public_recipes)
    public_recipes = this.makeRow(public_recipes)
    popular_recipes = this.makeRow(popular_recipes)
    favorite_recipes = this.makeRow(favorite_recipes)
    
    return (
      <React.Fragment>

          <header className='border-bottom'>
            <div className='container-fluid d-flex justify-content-between align-items-center'>
              <i>The kitchen is yours, {`chef${localStorage.getItem('user') ? ' '.concat(JSON.parse(localStorage.user).username) : ''}`}!</i>
              <a href="/"><h1 className='text-uppercase'>Batch Maker</h1></a>
              <div className='user-actions'>
                <li><Create width="25" height="25"/></li>
                <li><Login/></li>
              </div>
            </div>
          </header>

        <div className='container'>
          <div className='row'>
            <nav className='d-none d-md-flex col-2 flex-column border-right align-items-center text-center'>
              <div className='p-4'>My Recipes</div><div style={{height:"1px", width:"25px", backgroundColor: "grey"}}></div>
              <div className='p-4'>Public Recipes</div><div style={{height:"1px", width:"25px", backgroundColor: "grey"}}></div>
              <div className='p-4'>Popular Recipes</div><div style={{height:"1px", width:"25px", backgroundColor: "grey"}}></div>
              <div className='p-4'>My Favorite Recipes</div><div style={{height:"1px", width:"25px", backgroundColor: "grey"}}></div>
              <div className='p-4'>My Pantry</div><div style={{height:"1px", width:"25px", backgroundColor: "grey"}}></div>
            </nav>

            <div className='col m-4'>
              <div className='justify-content-between'>
                  <div className='row d-flex align-items-center'>
                    <div className='m-2'>All Recipes</div>
                    <div className='divider-bar flex-grow-1' style={{height:"1px", backgroundColor:"grey"}}></div>
                    <div className='m-2'>View All ></div>
                  </div>
                  <ul className='d-flex list-unstyled flex-wrap'>
                    {recipes}
                  </ul>
                </div>
              <div className='justify-content-between'>
                <div className='row d-flex align-items-center'>
                  <div className='m-2'>My Recipes</div>
                  <div className='divider-bar flex-grow-1' style={{height:"1px", backgroundColor:"grey"}}></div>
                  <div className='m-2'>View All ></div>
                </div>
                <ul className='d-flex list-unstyled flex-wrap'>
                  {my_recipes}
                </ul>
              </div>
              <div className='justify-content-between'>
                <div className='row d-flex align-items-center'>
                  <div className='m-2'>Public Recipes</div>
                  <div className='divider-bar flex-grow-1' style={{height:"1px", backgroundColor:"grey"}}></div>
                  <div className='m-2'>View All ></div>
                </div>
                <ul className='d-flex list-unstyled flex-wrap'>
                  {public_recipes}
                </ul>
              </div>
              <div className='justify-content-between'>
                <div className='row d-flex align-items-center'>
                  <div className='m-2'>Popular Recipes</div>
                  <div className='divider-bar flex-grow-1' style={{height:"1px", backgroundColor:"grey"}}></div>
                  <div className='m-2'>View All ></div>
                </div>
                <ul className='d-flex list-unstyled flex-wrap'>
                  {popular_recipes}
                </ul>
              </div>
              <div className='justify-content-between'>
                <div className='row d-flex align-items-center'>
                  <div className='m-2'>My Favorite Recipes</div>
                  <div className='divider-bar flex-grow-1' style={{height:"1px", backgroundColor:"grey"}}></div>
                  <div className='m-2'>View All ></div>
                </div>
                <ul className='d-flex list-unstyled flex-wrap'>
                  {favorite_recipes}
                </ul>
              </div>              
            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default App;
