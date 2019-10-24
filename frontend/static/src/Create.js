import React from 'react';
import axios from 'axios';
import './Create.css';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'test1',
      image: null,
      created_by: null,
      private: 'off',
      type: 'Anytime',
      prep_time: '00:00',
      cook_time: '00:00',
      cook_temp: 10,
      cook_temp_unit: 'Fahrenheit',
      notes: 'this is notes',

      preview: '',
      showCreate: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleShowCreate = this.handleShowCreate.bind(this);
    this.handleHideCreate = this.handleHideCreate.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('image', this.state.image);
    formData.append('created_by', null);
    formData.append('private', this.state.private === 'on' ? true : false);
    formData.append('type', this.state.type);
    formData.append('prep_time', this.state.prep_time);
    formData.append('cook_time', this.state.cook_time);
    formData.append('cook_temp', this.state.cook_temp);
    formData.append('cook_temp_unit', this.state.cook_temp_unit);
    formData.append('notes', this.state.notes);
    console.log(formData)

    axios.post('/api/v1/recipes/', formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(() => {
      this.setState({
        title: '',
        image: null,
        private: false,
        type: 'Anytime',
        prep_time: '00:00',
        cook_time: '00:00',
        cook_temp: 0,
        cook_temp_unit: 'Fahrenheit',
        notes: '',
  
        preview: '',
        showCreate: false,
      })
    })
    .catch(error => {
      console.log(error)
    })
  }


  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleCheckBoxChange(e) {
    if (e.target.checked === 'on') {
      this.setState({[e.target.name]: true})
    } else {
      this.setState({[e.target.name]: false})
    }
    
  }

  handleImageChange(e) {
    let file = e.target.files[0];
    console.log(file)
    this.setState({image: file});
    
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({preview: reader.result})
    };

    reader.readAsDataURL(file);
  }

  handleShowCreate(e) {
    this.setState({showCreate: true})
  }

  handleHideCreate(e) {
    this.setState({showCreate: false})
  }

  render () {
    let create = null;
    if (this.state.showCreate) {
      create = 
        <div className={this.state.showCreate ? "create-selected" : "create"}>
          <form  className="create-content animate" onSubmit={() => (this.handleSubmit)}>
            <div className="imgcontainer">
              <span onClick={this.handleHideCreate} className="close" title="Close Create">&times;</span>
            </div>

            <div className="container">
              Basic Info:
              <br/><br/>
              Title: <input type='text' name='title' value={this.state.title} onChange={this.handleChange}/><br/><br/>
              Image: <input type='file' name='image' onChange={this.handleImageChange}/>
              {this.state.image ? (
                <img src={this.state.preview} alt='preview' width="200"/>
              ) : (
                null
              )}
              <br/>
              Make Recipe Private: <input type="checkbox" name='private'/>
              <br/>
              Recipe Type:<select name='type'>
                <option value='Anytime'>Anytime</option>
                <option value='Breakfast'>Breakfast</option>
                <option value='Lunch'>Lunch</option>
                <option value='Dinner'>Dinner</option>
              </select>
              <br/>
              Prep Time: <input type="text" name="prep_time" pattern="[0-9]{2}:[0-9]{2}" placeholder='00:00'></input>
              Cook Time: <input type="text" name="cook_time" pattern="[0-9]{2}:[0-9]{2}" placeholder='00:00'></input>
              Cooking Temp: <input type="number" name="cook_temp" min="0" max="999" step="5"/>
              <select name='cook_temp_unit'>
                <option value='Fahrenheit'>F</option>
                <option value='Celsius'>C</option>
              </select>
              <br/>
              Notes: <input type='text' name='notes' value={this.state.notes} onChange={this.handleChange}/>
              <br/><br/>
              <button type="submit">Finish!</button>
            </div>
            
            
          </form>
        </div>
    }    
    return (
      <>
      <button onClick={this.handleShowCreate} className="create-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox={`0 0 24 24`}>
          <path d="M13 2v9h9v2h-9v9h-2v-9h-9v-2h9v-9h2zm2-2h-6v9h-9v6h9v9h6v-9h9v-6h-9v-9z"/>
        </svg>
      </button>
      {create}
      </>
    )
  }
}

export default Create