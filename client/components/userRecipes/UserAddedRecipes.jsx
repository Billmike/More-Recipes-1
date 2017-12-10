import React from 'react';
import PropTypes from 'prop-types';

import { decoded } from '../../utils/authenticate';
import UserRecipeCard from './UserRecipeCard';

/**
 * Class representing user added recipes
 *
 * @class UserAddedRecipes
 * @extends {React.Component}
 */
class UserAddedRecipes extends React.Component {
  /**
   * Component did mount lifecycle method
   *
   * @returns {func} Fetch user's recipes
   * @memberof UserAddedRecipes
   */
  componentDidMount() {
    const { user: { id } } = decoded;
    console.log(this);
    this.props.fetchUserRecipes(id);
  }
  /**
   * Render method
   *
   * @returns {object} React element
   * @memberof UserAddedRecipes
   */
  render() {
    const { userRecipes: { userAddedRecipes } } = this.props,
      { recipes } = userAddedRecipes;
    return (
      <div className="row">
        {recipes && recipes.map(recipe => (
          <UserRecipeCard key={recipe.id} recipe={recipe} {...this.props} />
        ))}
      </div>
    );
  }
}

UserAddedRecipes.propTypes = {
  userRecipes: PropTypes.shape({
    userAddedRecipes: PropTypes.shape({
      data: PropTypes.shape({
        recipes: PropTypes.arrayOf(PropTypes.shape()),
      }),
    }),
  }).isRequired,
  fetchUserRecipes: PropTypes.func.isRequired,
};

export default UserAddedRecipes;