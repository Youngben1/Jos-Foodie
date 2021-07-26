import React, {useState} from "react";
import Axios from "axios"
import './App.css';
import Recipe from './components/Recipe';
import {v4 as uuidv4} from 'uuid';
import Alert from './components/Alert';

const App = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  const APP_ID = "878e33a3";

  const APP_KEY = "de5664c205b011222a69557fe7a5e15f";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if(query !== "") {
      const result = await Axios.get(url);
      if(!result.data.more) {
        return setAlert('Abeg, no chow like that');
      }
      setRecipes(result.data.hits)
      console.log(result);
      setAlert("");
      setQuery("");
    } else {
      setAlert('Abeg type something')
    }
      
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  }

  return (
    <div className="App">
        <h1>Jos Foodies</h1>
        <form className="search-form" onSubmit={onSubmit}>
          {alert !== "" && <Alert alert={alert}/>}
          <input type="text" placeholder="Search Food" autoComplete="off" onChange={onChange} value={query} />
          <input type="submit" value="search" />
        </form>
        <div className="recipes">
          {recipes !== [] && recipes.map(recipe =>
            <Recipe key={uuidv4()} recipe={recipe} />)}
        </div>
    </div>
  );
}

export default App;
