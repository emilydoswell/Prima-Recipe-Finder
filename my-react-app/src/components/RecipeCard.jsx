import PropTypes from 'prop-types';
import './RecipeCard.css';

function RecipeCard({
  name,
  ingredients,
  closeModal,
  instructions
}) {
  return (
    <div className="recipeCardOverlay">
      <div className="recipeCardContainer">
        <h2>{name}</h2>
        <h3>Ingredients:</h3>
        <ul className="recipeCardList">
          {ingredients.split("|").map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3>Instructions:</h3>
        <div className="instructionsContainer">
          <p>{instructions}</p>
        </div>
        <button onClick={closeModal} className="button">Close Recipe Card</button>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  instructions: PropTypes.string.isRequired
};

export default RecipeCard;
