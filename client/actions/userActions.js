import axios from 'axios';

import * as actionTypes from './actionTypes';
import config from '../config';

const { SERVER_URL, CLOUDINARY_URL } = config;

/**
 * User signup request action creator
 *
 * @returns {object} User signup request action
 */
const userSignupRequest = () => ({
  type: actionTypes.SIGNUP_REQUEST,
});

/**
 * User signup success action creator
 *
 * @param {any} user - User details
 *
 * @returns {object} User signup action
 */
const userSignupSuccess = user => ({
  type: actionTypes.SIGNUP_SUCCESS,
  payload: user,
});

/**
 * User signup failure action creator
 *
 * @param {object} error - Error in signing up
 *
 * @returns {object} User signup failure object
 */
const userSignupFailure = error => ({
  type: actionTypes.SIGNUP_FAILURE,
  payload: error,
});

/**
 * User signin request action creator
 *
 * @returns {object} User signin request action
 */
const userSigninRequest = () => ({
  type: actionTypes.SIGNIN_REQUEST,
});

/**
 * User signin success action creator
 *
 * @param {any} user - User details
 *
 * @returns {object} User signin action
 */
const userSigninSuccess = user => ({
  type: actionTypes.SIGNIN_SUCCESS,
  payload: user,
});

/**
 * User signin failure action creator
 *
 * @param {any} error - Error in signing up user
 *
 * @returns {object} User signin failure action
 */
const userSigninFailure = error => ({
  type: actionTypes.SIGNIN_FAILURE,
  payload: error,
});

/**
 * User logout request action creator
 *
 * @returns {object} User logout request action
 */
const userLogoutRequest = () => ({
  type: actionTypes.LOGOUT_REQUEST,
});

/**
 * User logout success action creator
 *
 * @returns {object} User logout success action
 */
const userLogoutSuccess = () => ({
  type: actionTypes.LOGOUT_SUCCESS
});

/**
 * Fetch user profile request action creator
 *
 * @returns {object} Fetch user profile request action
 */
const fetchUserProfileRequest = () => ({
  type: actionTypes.FETCH_USER_PROFILE_REQUEST,
});

/**
 * Fetch user profile success action creator
 *
 * @param {any} user - User details
 *
 * @returns {object} Fetch user profile success action
 */
const fetchUserProfileSuccess = user => ({
  type: actionTypes.FETCH_USER_PROFILE_SUCCESS,
  payload: user,
});

/**
 * Fetch user profile failure action creator
 *
 * @param {object} error - Error in fetching user profile
 *
 * @returns {object} Fetch user profile failure action
 */
const fetchUserProfileFailure = error => ({
  type: actionTypes.FETCH_USER_PROFILE_FAILURE,
  payload: error,
});

/**
 * Edit user profile request action creator
 *
 * @returns {object} Edit user profile request action
 */
const editUserProfileRequest = () => ({
  type: actionTypes.EDIT_USER_PROFILE_REQUEST,
});

/**
 * Edit user profile success action creator
 *
 * @param {object} user - User profile details
 *
 * @returns {object} Edit user profile success action
 */
const editUserProfileSuccess = user => ({
  type: actionTypes.EDIT_USER_PROFILE_SUCCESS,
  payload: user,
});
/**
 * Edit user profile failure action creator
 *
 * @param {object} error - Error in editing user profile
 *
 * @returns {object} Edit user profile failure action
 */
const editUserProfileFailure = error => ({
  type: actionTypes.EDIT_USER_PROFILE_FAILURE,
  payload: error,
});

/**
 * Upload userImage request action creator
 *
 * @returns {object} Upload user image request action
 */
const uploadUserImageRequest = () => ({
  type: actionTypes.UPLOAD_USER_IMAGE_REQUEST,
});

/**
 * Upload user image success action creator
 *
 * @param {string} userImageUrl - Uploaded image url
 *
 * @returns {object} Upload user image success action
 */
const uploadUserImageSuccess = userImageUrl => ({
  type: actionTypes.UPLOAD_USER_IMAGE_SUCCESS,
  payload: userImageUrl,
});

/**
 * Upload user image failure action creator
 *
 * @param {object} error - Error in uploading user image
 *
 * @returns {object} Upload user image failure action
 */
const uploadUserImageFailure = error => ({
  type: actionTypes.UPLOAD_USER_IMAGE_FAILURE,
  payload: error,
});

/**
 * Signup user async action creator
 *
 * @param {any} values - User details
 *
 * @returns {object} Dispatch necessary action
 */
const signupUser = values => (dispatch) => {
  dispatch(userSignupRequest());
  return axios.post(`${SERVER_URL}/users/signup`, values)
    .then((response) => {
      const { data } = response;
      const { data: { user } } = data;
      const { token } = user;
      dispatch(userSignupSuccess(user));
      localStorage.setItem('token', token);
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(userSignupFailure(data));
    });
};

/**
 * Sign in user async action creator
 *
 * @param {any} values - User details
 *
 * @returns {object} Dispatch necessary action
 */
const signinUser = values => (dispatch) => {
  dispatch(userSigninRequest());
  return axios.post(`${SERVER_URL}/users/signin`, values)
    .then((response) => {
      const { data } = response;
      const { data: { user } } = data;
      const { token } = user;
      dispatch(userSigninSuccess(user));
      localStorage.setItem('token', token);
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(userSigninFailure(data));
    });
};

/**
 * Logout user async action creator
 *
 * @returns {object} Dispatch necessary action
 */
const logoutUser = () => (dispatch) => {
  dispatch(userLogoutRequest());
  const loggingOut = new Promise(resolve => resolve());
  return loggingOut.then(() => {
    localStorage.removeItem('token');
    dispatch(userLogoutSuccess());
  });
};

/**
 * Fetch user profile async action creator
 *
 * @param {number} userId - Id of the user
 *
 * @returns {object} Dispatch necessary action
 */
const fetchUserProfile = userId => (dispatch) => {
  const token = {
    'x-access-token': localStorage.getItem('token'),
  };
  dispatch(fetchUserProfileRequest());
  return axios.get(`${SERVER_URL}/users/${userId}`, { headers: token })
    .then((response) => {
      const { data } = response;
      const { data: { user } } = data;
      dispatch(fetchUserProfileSuccess(user));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(fetchUserProfileFailure(data));
    });
};

/**
 * Edit user profile async action creator
 *
 * @param {any} values -  User profile update values
 *
 * @returns {object} Dispatch necessary action
 */
const editUserProfile = values => (dispatch) => {
  const token = {
    'x-access-token': localStorage.getItem('token'),
  };
  dispatch(editUserProfileRequest());
  return axios.put(`${SERVER_URL}/users`, values,
    { headers: token })
    .then((response) => {
      const { data } = response;
      const { data: { user } } = data;
      dispatch(editUserProfileSuccess(user));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(editUserProfileFailure(data));
    });
};

/**
 * Upload user image async action creator
 *
 * @param {any} value - User image details
 *
 * @returns {object} Dispatch necessary actions
 */
const uploadUserImage = value => (dispatch) => {
  dispatch(uploadUserImageRequest());
  return axios.post(`${CLOUDINARY_URL}`, value)
    .then((response) => {
      const { data } = response;
      const { secure_url } = data;
      dispatch(uploadUserImageSuccess(secure_url));
    })
    .catch((errorMessage) => {
      const { response: { data: { error } } } = errorMessage;
      dispatch(uploadUserImageFailure(error));
    });
};

export {
  signupUser, signinUser, logoutUser, fetchUserProfile, editUserProfile,
  uploadUserImage,
};
