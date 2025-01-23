import { useEffect, useState } from 'react'
import './App.css'
import Recipe from './components/recipe';
import SavedRecipesList from './components/SavedRecipesList';

function App() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chocolate');
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
    const saved = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    setSavedRecipes(saved);
  }, [query]);

  const url = `https://api.api-ninjas.com/v1/recipe?query=${query}`;
  const apiKey = import.meta.env.VITE_APIKEY;

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
      setRecipes(result);
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
  };

  function saveRecipe(name, ingredients, description, instructions) {
    const recipe = {
      name: name,
      ingredients: ingredients,
      description: description,
      instructions: instructions
    };
    const updatedRecipes = [...savedRecipes, recipe];
    setSavedRecipes(updatedRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
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
      <div className="recipeListContainer">
        <SavedRecipesList recipes={savedRecipes}/>
      </div>
      <h3>Search for Recipes</h3>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button button" type="submit">
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
            onSave={saveRecipe}
          />
        ))}
      </div>
    </>
  )
}

export default App
