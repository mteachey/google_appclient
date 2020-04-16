import React, {Component} from 'react';
import './App.css';
import GoogleApp from './GoogleApp/GoogleApp.js'

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      googleapps:[],
      genreChoice:"",
      sort:"",
      error:null
    }
  }

updateStateGoogleApps(apps){
    this.setState({googleapps:apps})
  }

updateStateGenre(genre){
   this.setState({genreChoice:genre})
 }

updateStateSort(sort){
  this.setState({'sort':sort})
}

handleSubmit(e){
  e.preventDefault();
  const {genreChoice, sort} = this.state;
  console.log(`form submitted ${genreChoice}`);

  const baseURL = 'http://localhost:8000/apps';
  const params =[];

  if(genreChoice){
    params.push(`genres=${genreChoice}`);
  }
  if(sort){
    params.push(`sort=${sort}`);
  }
  
   const query = params.join("&");
   const url = `${baseURL}?${query}`;
   console.log('from posthttp://localhost:8000/apps?genres=action&sort=App');
   console.log(url);

   fetch(url)
    .then(res =>{
      if(!res.ok){
        throw new Error(res.statusText)
      }
      return res.json();
    })
    .then(data=>{
      this.updateStateGoogleApps(data);
      this.setState({error:null});
    })
    .catch(err=>{
      this.setState({error:'Sorry, could not get apps at this time.'});
    })
}

  render(){
    const googleapps = this.state.googleapps.map((app,i)=>{
     return(<GoogleApp{...app} key={i}/>)
    })
  return (
    <main className="App">
      <h1>Google Apps!</h1>
      <div className="search-sort-form">
        <form onSubmit={e=>this.handleSubmit(e)}>
          <label htmlFor="genre">Search by Genre</label>
          <select id="genre" name="genre" 
            onChange={e=>this.updateStateGenre(e.target.value)}>
            <option value="">All</option>
            <option value="action">Action</option>
            <option value="strategy">Strategy</option>
            <option value="puzzle">Puzzle</option>
            <option value="casual">Casual</option>
            <option value="arcade">Arcade</option>
            <option value="card">Card</option>
          </select>
          <label htmlFor="sort">Sort</label>
          <select id="sort" name="sort" 
            onChange={e=>this.updateStateSort(e.target.value)}>
            <option value="">None</option>
            <option value="Rating">Rating</option>
            <option value="App">App</option>
          </select>
         <button type="submit">Search</button>
        </form>
      </div>
      <ul className="app-list">
        {googleapps}
      </ul> 
    </main>
  );
  }
}

export default App;
