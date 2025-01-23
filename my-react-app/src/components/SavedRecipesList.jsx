import PropTypes from 'prop-types';
import { useState } from 'react';
import RecipeCard from './RecipeCard';

function SavedRecipesList({
  recipes
}) {

  const [openRecipeCard, setOpenRecipeCard] = useState(false);
  const [recipeName, setRecipeName] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState('');
  const [recipeInstructions, setRecipeInstructions] = useState('');

  const getRecipeDetailsByName = (recipeName) => {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

    const recipe = savedRecipes.find((r) => r.name.toLowerCase() === recipeName.toLowerCase());

    if (recipe) {
      setRecipeName(recipe.name);
      setRecipeIngredients(recipe.ingredients);
      setRecipeInstructions(recipe.instructions);

      setOpenRecipeCard(true)
    }

    return recipe || null;
  }

  return (
    <div>
      <h2>Saved Recipes</h2>
      <ul>
        <li>
          {recipes.map((recipe, i) => (
            <button onClick={() => getRecipeDetailsByName(recipe.name)} key={i} className="button">{recipe.name}</button>
          ))}
        </li>
      </ul>
      <div>
        { openRecipeCard && (
          <RecipeCard
            name={recipeName}
            ingredients={recipeIngredients}
            closeModal={() => setOpenRecipeCard(false)}
            instructions={recipeInstructions}
          />
        )}
      </div>
    </div>
  );
};

SavedRecipesList.propTypes = {
  recipes: PropTypes.shape.isRequired
};

export default SavedRecipesList;