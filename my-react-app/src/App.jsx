import { useEffect, useState } from 'react'
import './App.css'
import Recipe from './components/recipe';

function App() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chocolate');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, [query]);

  const apiKey = 'WkfnTasjSTjZY+uxDXwSWQ==xZgvYFcjauxlFui1';
  const url = `https://api.api-ninjas.com/v1/recipe?query=${query}`;

  const getRecipes = async () => {
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      console.log(result); // Handle success
      setRecipes(result);
    })
    .catch(error => {
      console.error('Error:', error.message); // Handle error
    });
  };


  function updateSearch(e) {
    setSearch(e.target.value);
  };

  function getSearch(e) {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <>
      <div>
        <h1>Recipe Finder</h1>
      </div>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.title}
            name={recipe.title}
            // image={recipe.recipe.image}
            ingredients={recipe.ingredients}
            description={recipe.servings}
            instructions={recipe.instructions}
          />
        ))}
      </div>
    </>
  )
}

export default App
