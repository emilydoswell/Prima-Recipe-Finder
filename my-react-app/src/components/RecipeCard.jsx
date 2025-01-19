import PropTypes from 'prop-types';

function RecipeCard({
  name,
  ingredients,
  closeModal,
  instructions
}) {
  return (
    <div>
      <h2>{name}</h2>
      <h3>Ingredients:</h3>
      <ul>
        {ingredients.split("|").map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{instructions}</p>
      <button onClick={closeModal}>Close Recipe Card</button>
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
