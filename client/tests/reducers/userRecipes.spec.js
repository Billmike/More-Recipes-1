import userRecipesReducer, { initialState } from '../../reducers/userRecipes';
import * as actionTypes from '../../actions/actionTypes';
import recipesMockData from '../__mocks__/recipe';

describe('User recipes reducer', () => {
  it('should return the default initial state', () => {
    expect(userRecipesReducer(initialState, {})).toEqual(initialState);
  });
  describe('fetch user recipes', () => {
    it('should handle fetch user recipes request', () => {
      const action = {
        type: actionTypes.FETCH_USER_RECIPES_REQUEST,
      };
      expect(userRecipesReducer(initialState, action)).toEqual({
        ...initialState,
        isFetchingUserRecipes: true,
        userAddedRecipes: [],
        userAddedRecipesCount: 0,
      });
    });
    it('should handle fetch user recipes success', () => {
      const action = {
        type: actionTypes.FETCH_USER_RECIPES_SUCCESS,
        payload: {
          recipes: recipesMockData.fetchUserRecipesSuccess.recipes,
          recipesCount: recipesMockData.fetchUserRecipesSuccess
            .recipesCount,
        }
      };
      expect(userRecipesReducer(initialState, action)).toEqual({
        ...initialState,
        isFetchingUserRecipes: false,
        userAddedRecipes: action.payload.recipes,
        userAddedRecipesCount: action.payload.recipesCount,
        errorFetchingUserRecipes: {},
      });
    });
    it('should handle fetch user recipes failure', () => {
      const action = {
        type: actionTypes.FETCH_USER_RECIPES_FAILURE,
        payload: recipesMockData.fetchUserRecipesFailure
      };
      expect(userRecipesReducer(initialState, action)).toEqual({
        ...initialState,
        isFetchingUserRecipes: false,
        errorFetchingUserRecipes: action.payload,
      });
    });
  });
  describe('fetch user favorites', () => {
    it('should handle fetch user favorites request', () => {
      const action = {
        type: actionTypes.FETCH_USER_FAVORITES_REQUEST,
      };
      expect(userRecipesReducer(initialState, action)).toEqual({
        ...initialState,
        isFetchingUserFavorites: true,
        userFavorites: [],
        userFavoritesCount: 0,
      });
    });
    it('should handle fetch user favorites success', () => {
      const action = {
        type: actionTypes.FETCH_USER_FAVORITES_SUCCESS,
        payload: {
          favorites: recipesMockData.fetchUserFavoritesSuccess.favorites,
          favoritesCount: recipesMockData.fetchUserFavoritesSuccess
            .favoritesCount,
        }
      };
      expect(userRecipesReducer(initialState, action)).toEqual({
        ...initialState,
        isFetchingUserFavorites: false,
        userFavorites: action.payload.favorites,
        userFavoritesCount: action.payload.favoritesCount,
        errorFetchingUserFavorites: {},
      });
    });
    it('should handle fetch user favorites failure', () => {
      const action = {
        type: actionTypes.FETCH_USER_FAVORITES_FAILURE,
        payload: recipesMockData.fetchUserFavoritesFailure
      };
      expect(userRecipesReducer(initialState, action)).toEqual({
        ...initialState,
        isFetchingUserFavorites: false,
        errorFetchingUserFavorites: action.payload,
      });
    });
    it('should handle update use favorite recipes', () => {
      const action = {
        type: actionTypes.UPDATE_USER_FAVORITE_RECIPES,
        payload: recipesMockData.recipeId,
      };
      const newState = {
        ...initialState,
        userFavorites: [{
          Recipe: { id: 2 }
        }, {
          Recipe: { id: 3 }
        }],
        userFavoritesCount: 2,
      };
      expect(userRecipesReducer(newState, action)).toEqual({
        ...newState,
      });
    });
  });
  describe('add recipe', () => {
    it('should handle add recipe request', () => {
      const action = {
        type: actionTypes.ADD_RECIPE_REQUEST,
      };
      expect(userRecipesReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: true,
      });
    });
    it('should handle add recipe success', () => {
      const action = {
        type: actionTypes.ADD_RECIPE_SUCCESS,
        payload: recipesMockData.addRecipeSuccess
      };
      expect(userRecipesReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        imageUploaded: false,
        userAddedRecipes: [
          ...initialState.userAddedRecipes,
          action.payload,
        ],
        error: {},
      });
    });
    it('should handle add recipe failure', () => {
      const action = {
        type: actionTypes.ADD_RECIPE_FAILURE,
        payload: recipesMockData.addRecipeFailure
      };
      expect(userRecipesReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        error: action.payload,
      });
    });
    it('should handle update user recipes count', () => {
      const action = {
        type: actionTypes.UPDATE_USER_RECIPES_COUNT,
        payload: 1,
      };
      expect(userRecipesReducer(initialState, action)).toEqual({
        ...initialState,
        userAddedRecipesCount: initialState.userAddedRecipesCount + action.payload,
      });
    });
  });
  describe('edit recipe', () => {
    it('should handle edit recipe request', () => {
      const action = {
        type: actionTypes.EDIT_RECIPE_REQUEST,
      };
      expect(userRecipesReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: true,
      });
    });
    it('should handle edit recipe success', () => {
      const action = {
        type: actionTypes.EDIT_RECIPE_SUCCESS,
        id: 5,
        payload: recipesMockData.editRecipeSuccess.recipe,
      };
      const newState = {
        ...initialState,
        userAddedRecipes: [{
          id: 5,
          title: 'Macaroni',
          category: 'Dinner',
          description: 'Tasty and nutritious macaroni',
          preparationTime: 45,
          ingredients: 'Macaroni, groundnut oil, salt',
          directions: 'Do this, do this again, do that',
          recipeImage: 'Recipe image',
          upvotes: 0,
          downvotes: 0,
          views: 1,
          favorites: 0,
        }, {
          id: 8,
          title: 'Rice',
          category: 'Lunch',
          description: 'Tasty rice',
          preparationTime: 65,
          ingredients: 'Rice, groundnut oil, salt',
          directions: 'Do this, do this again, do that',
          recipeImage: 'Recipe image',
          upvotes: 5,
          downvotes: 0,
          views: 8,
          favorites: 0,
        }],
        userAddedRecipesCount: 2,
      };
      expect(userRecipesReducer(newState, action)).toEqual({
        ...newState,
        isLoading: false,
        imageUploaded: false,
        error: {},
      });
    });
    it('should handle edit recipe failure', () => {
      const action = {
        type: actionTypes.EDIT_RECIPE_FAILURE,
        payload: recipesMockData.editRecipeFailure
      };
      expect(userRecipesReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        error: action.payload,
      });
    });
  });
  describe('delete recipe', () => {
    it('should handle delete recipe request', () => {
      const action = {
        type: actionTypes.DELETE_RECIPE_REQUEST,
      };
      expect(userRecipesReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: true,
      });
    });
    it('should handle delete recipe success', () => {
      const action = {
        type: actionTypes.DELETE_RECIPE_SUCCESS,
        payload: 8,
      };
      const newState = {
        ...initialState,
        userAddedRecipes: [{
          id: 5,
          title: 'Macaroni',
          category: 'Dinner',
          description: 'Tasty and nutritious macaroni',
          preparationTime: 45,
          ingredients: 'Macaroni, groundnut oil, salt',
          directions: 'Do this, do this again, do that',
          recipeImage: 'Recipe image',
          upvotes: 0,
          downvotes: 0,
          views: 1,
          favorites: 0,
        }, {
          id: 8,
          title: 'Rice',
          category: 'Lunch',
          description: 'Tasty rice',
          preparationTime: 65,
          ingredients: 'Rice, groundnut oil, salt',
          directions: 'Do this, do this again, do that',
          recipeImage: 'Recipe image',
          upvotes: 5,
          downvotes: 0,
          views: 8,
          favorites: 0,
        }],
      };
      expect(userRecipesReducer(newState, action)).toEqual({
        ...newState,
        isLoading: false,
        userAddedRecipes: [newState.userAddedRecipes[0]],
        error: {},
      });
    });
    it('should handle delete recipe failure', () => {
      const action = {
        type: actionTypes.DELETE_RECIPE_FAILURE,
        payload: recipesMockData.deleteRecipeFailure
      };
      expect(userRecipesReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        error: action.payload,
      });
    });
  });
  describe('upload recipe image', () => {
    it('should handle upload image request', () => {
      const action = {
        type: actionTypes.UPLOAD_IMAGE_REQUEST,
      };
      expect(userRecipesReducer(initialState, action)).toEqual({
        ...initialState,
        imageUploading: true,
        imageUploaded: false,
      });
    });
    it('should handle upload image success', () => {
      const action = {
        type: actionTypes.UPLOAD_IMAGE_SUCCESS,
        payload: recipesMockData.uploadImageSuccessResponse
      };
      expect(userRecipesReducer(initialState, action)).toEqual({
        ...initialState,
        imageUploading: false,
        imageUploaded: true,
        imageUrl: action.payload,
        error: {},
      });
    });
    it('should handle upload image failure', () => {
      const action = {
        type: actionTypes.UPLOAD_IMAGE_FAILURE,
        payload: recipesMockData.uploadImageFailureResponse
      };
      expect(userRecipesReducer(initialState, action)).toEqual({
        ...initialState,
        imageUploading: false,
        imageUploaded: false,
        error: action.payload,
      });
    });
  });
});
