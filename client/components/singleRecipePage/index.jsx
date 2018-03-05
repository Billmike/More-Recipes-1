import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import actionCreators from '../../actions';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Main from './Main';
import { getToken } from '../../utils/authenticate';

const propTypes = {
  singleRecipe: PropTypes.shape({
    recipe: PropTypes.shape({
      id: PropTypes.number,
    })
  }).isRequired,
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
  fetchRecipe: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    })
  }).isRequired,
  postReview: PropTypes.func.isRequired,
  upvoteRecipe: PropTypes.func.isRequired,
  downvoteRecipe: PropTypes.func.isRequired,
  setFavorite: PropTypes.func.isRequired,
};

/**
 * Class representing recipe details page
 *
 * @class Recipe
 *
 * @extends {Component}
 */
class Recipe extends Component {
  /**
   * Creates an instance of Recipe.
   *
   * @param {any} props - This is the props param
   *
   * @memberof Recipe
   */
  constructor(props) {
    super(props);
    this.state = {
      openSignup: false,
      openSignin: false,
      reviewContent: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddReview = this.handleAddReview.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  /**
   * Component did mount
   *
   * @returns {object} React element
   *
   * @memberof Recipe
   */
  componentDidMount() {
    window.scrollTo(0, 0);
    // Initialize materialize css parallax class
    $('.parallax').parallax();
    this.props.fetchRecipe(this.props.match.params.recipeId);
  }

  /**
   * Funtion to handle review input state
   *
   * @param {string} event - The input value
   *
   * @returns {string} The updated state
   *
   * @memberof Recipe
   */
  handleChange(event) {
    this.setState({
      reviewContent: event.target.value,
    });
  }

  /**
   * Function to handle submission of review
   *
   * @param {string} event - The user review
   *
   * @returns {func} Dispatch function
   *
   * @memberof Recipe
   */
  handleAddReview(event) {
    event.preventDefault();
    const { postReview, match, user: { isAuthenticated } } = this.props;
    const { params: { recipeId } } = match;
    const review = {
      content: this.state.reviewContent,
    };
    if (isAuthenticated && getToken() !== null) {
      postReview(recipeId, review)
        .then(() => {
          const { singleRecipe: { error } } = this.props;
          if (isEmpty(error)) {
            this.setState({
              reviewContent: '',
            });
          }
        });
    } else {
      this.handleOpenSignin();
    }
  }

  /**
   * Function to handle upvoting a recipe
   *
   * @returns {any} Call to upvote recipe action
   *
   * @memberof Recipe
   */
  handleUpvote() {
    const { singleRecipe, upvoteRecipe } = this.props;
    const { recipe: { id } } = singleRecipe;

    upvoteRecipe(id);
  }

  /**
   * Function to handle downvoting a recipe
   *
   * @returns {any} Call to upvote recipe action
   *
   * @memberof Recipe
   */
  handleDownvote() {
    const { singleRecipe, downvoteRecipe } = this.props;
    const { recipe: { id } } = singleRecipe;

    downvoteRecipe(id);
  }

  /**
   * Function to handle downvoting a recipe
   *
   * @returns {any} Call to action for favoriting a recipe
   *
   * @memberof Recipe
   */
  handleFavorite() {
    const { singleRecipe, setFavorite } = this.props;
    const { recipe: { id } } = singleRecipe;

    setFavorite(id);
  }

  /**
   * Render method
   *
   * @returns {object} React element
   *
   * @memberof Recipe
   */
  render() {
    const { singleRecipe } = this.props;

    return (
      <div>
        {!isEmpty(singleRecipe) &&
          <div className="page-body">
            <header>
              <Header
                {...this.props}
              />
            </header>
            <main>
              <Main
                singleRecipe={singleRecipe}
                reviewContent={this.state.reviewContent}
                handleChange={this.handleChange}
                handleAddReview={this.handleAddReview}
                handleUpvote={this.handleUpvote}
                handleDownvote={this.handleDownvote}
                handleFavorite={this.handleFavorite}
              />
            </main>
            <footer>
              <Footer />
            </footer>
          </div>
        }
      </div>
    );
  }
}

/**
 * Function to map values from state to props
 *
 * @param {object} state - The state values
 *
 * @returns {object} - The mapped props
 */
const mapStateToProps = state => ({
  singleRecipe: state.singleRecipe,
  user: state.user,
  userRecipes: state.userRecipes,
});

/**
 * Function to map dispatch to props
 * Action creators are binded to the dispatch function
 *
 * @param {any} dispatch - The store dispatch function
 *
 * @returns {any} The mapped props
 */
const mapDispatchToProps = dispatch => (
  bindActionCreators(actionCreators, dispatch)
);

Recipe.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);