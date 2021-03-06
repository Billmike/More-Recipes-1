import axios from 'axios';

import * as actionTypes from './actionTypes';
import { getToken } from '../utils/authenticate';
import config from '../config';
import store from '../store';

const { SERVER_URL } = config;

/**
 * Post review request action creator
 *
 * @return {object} Post review request action
 */
export const postReviewRequest = () => ({
  type: actionTypes.POST_REVIEW_REQUEST,
});

/**
 * Post review success action creator
 *
 * @param {object} review - Review content
 *
 * @returns {object} Post review success action
 */
export const postReviewSuccess = review => ({
  type: actionTypes.POST_REVIEW_SUCCESS,
  payload: review,
});

/**
 * Post review failure action creator
 *
 * @param {pbject} error - Error posting review
 *
 * @returns {object} Post review failure action
 */
export const postReviewFailure = error => ({
  type: actionTypes.POST_REVIEW_FAILURE,
  payload: error,
});

/**
 * Fetch reviews request action creator
 *
 * @returns {object} Fetch reviews request action
 */
export const fetchReviewsRequest = () => ({
  type: actionTypes.FETCH_REVIEWS_REQUEST,
});

/**
 * Fetch reviews success action creator
 *
 * @param {array} reviews - Reviews retrieved
 * @param {number} reviewsCount - Number of reviews
 *
 * @returns {object} Fetch reviews success action
 */
export const fetchReviewsSuccess = (reviews, reviewsCount) => ({
  type: actionTypes.FETCH_REVIEWS_SUCCESS,
  payload: {
    reviews,
    reviewsCount,
  }
});

/**
 * Fetch review failure action creator
 *
 * @param {object} error - Error fetching review
 *
 * @returns {object} Fetch reviews failure action
 */
export const fetchReviewsFailure = error => ({
  type: actionTypes.FETCH_REVIEWS_FAILURE,
  payload: error,
});

/**
 * Post review async action creator
 *
 * @param {any} recipeId - Id of recipe
 * @param {any} reviewContent - Review content
 *
 * @returns {object} Dispatch necessary action
 */
const postReview = (recipeId, reviewContent) => (dispatch) => {
  const token = {
    'x-access-token': getToken(),
  };

  dispatch(postReviewRequest());
  return axios.post(`${SERVER_URL}/recipes/${recipeId}/reviews`,
    reviewContent, { headers: token })
    .then((response) => {
      const { data } = response;
      const { data: { review } } = data;
      dispatch(postReviewSuccess(review));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(postReviewFailure(data));
    });
};

/**
 * Fetch review async action creator
 *
 * @param {number} recipeId - Id of recipe
 * @param {limit} limit
 * @param {offset} offset
 *
 * @returns {any} Dispatch necessary action
 */
const fetchReviews = (recipeId, limit = 5, offset = 0) => (dispatch) => {
  dispatch(fetchReviewsRequest());
  return axios.get(
    `${SERVER_URL}/recipes/${recipeId}/reviews?limit=${limit}&offset=${offset}`
  )
    .then((response) => {
      const { data } = response;
      const { data: { reviews, reviewsCount } } = data;

      if (store.getState().singleRecipe.reviews.length + reviews.length ===
        reviewsCount) {
        dispatch({
          type: actionTypes.FETCHED_ALL_REVIEWS,
        });
      }

      dispatch(fetchReviewsSuccess(reviews, reviewsCount));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(fetchReviewsFailure(data));
    });
};

/**
 * Clear reviews action creator
 *
 * @returns {any} Dispatch clear reviews action
 */
const clearReviews = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_ALL_REVIEWS,
  });
};

/**
 * Delete review async action creator
 *
 * @param {number} recipeId - Id of recipe
 * @param {number} reviewId - Id of review
 *
 * @returns {any} Dispatch necessary action
 */
const deleteReview = (recipeId, reviewId) => (dispatch) => {
  const token = {
    'x-access-token': getToken(),
  };

  return axios.delete(`${SERVER_URL}/recipes/${recipeId}/reviews/${reviewId}`,
    { headers: token })
    .then(() => {
      dispatch({
        type: actionTypes.DELETE_REVIEW,
        payload: reviewId,
      });
    });
};

export { postReview, fetchReviews, clearReviews, deleteReview };
