import PropTypes from 'prop-types';
import './Recipe.css';
import { useState } from 'react';
import RecipeCard from './RecipeCard';

function Recipe({
  name,
  ingredients,
  description,
  instructions,
  onSave
}) {

  const [openRecipeCard, setOpenRecipeCard] = useState(false);

  return (
    <div>
      <div>
        { openRecipeCard && (
          <RecipeCard
            name={name}
            ingredients={ingredients}
            closeModal={() => setOpenRecipeCard(false)}
            instructions={instructions}
          />
        )}
      </div>
      <div className="recipeContainer">
          <div className="recipeHeadings">
            <h2>{name}</h2>
          </div>
          <h3>Description: </h3>
          <p>{description}</p>
          <img 
            className="image" 
            src="src/images/food.jpg" 
            alt="Recipe Image showing bowl of salad and pitta on table with plants"
            sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
          />
          <div className="recipeBtn">
            <button onClick={() => setOpenRecipeCard(true)} className="button">
              Open
            </button>
            <button onClick={() => onSave(name, ingredients, description, instructions)} className="button">
              Save
            </button>
          </div>
      </div>
    </div>
  );
};

Recipe.propTypes = {
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired
};

export default Recipe;