import axios from 'axios';
import { setAlert } from './alert';
import {
   GET_PROFILE,
   GET_PROFILES,
   GET_REPOS,
   CREATE_PROFILE,
   UPDATE_PROFILE,
   PROFILE_ERROR,
   CLEAR_PROFILE,
   DELETE_ACCOUNT
}
from './types';

// get logged in user profile
export const getCurrentUserProfile = () => async dispatch => {
   try {
      const { data } = await axios.get('/api/profile/me');

      dispatch({
         type: GET_PROFILE,
         payload: data
      });
   } 
   catch(err) {
      dispatch({ 
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
}
// get profile by user id
export const getProfileByUserId = userId => async dispatch => {
   try {
      const { data } = await axios.get(`/api/profile/user/${userId}`);

      dispatch({
         type: GET_PROFILE,
         payload: data
      });
   } 
   catch(err) {
      dispatch({ 
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
}
// github repos
export const getGitHubRepos = userName => async dispatch => {
   try {
      const { data } = await axios.get(`/api/profile/github/${userName}`);

      dispatch({
         type: GET_REPOS,
         payload: data
      });
   } 
   catch(err) {
      dispatch({ 
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
}
// get all profiles
export const getProfiles = () => async dispatch => {
   try {
      const { data } = await axios.get('/api/profile');

      dispatch({
         type: GET_PROFILES,
         payload: data
      });
   } 
   catch(err) {
      dispatch({ 
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
}
// create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
   try {
      const { data } = await axios.post('/api/profile', formData);

      dispatch({
         type: CREATE_PROFILE,
         payload: data
      });
      dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));

      if(!edit) {
         history.push('/dashboard');
      }
   } 
   catch(err) {
      const { errors } = err.response.data;

      if(errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({ 
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
}
// add experience
export const addExperience = (formData, history) => async dispatch => {
   try {
      const { data } = await axios.put('/api/profile/experience', formData);

      dispatch({
         type: UPDATE_PROFILE,
         payload: data
      });
      dispatch(setAlert('Experience added', 'success'));
      history.push('/dashboard');
   } 
   catch(err) {
      const { errors } = err.response.data;

      if(errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({ 
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
}
// delete experience
export const deleteExperience = id => async dispatch => {
   try {
      const { data } = await axios.delete(`/api/profile/experience/${id}`);

      dispatch({
         type: UPDATE_PROFILE,
         payload: data
      });
      dispatch(setAlert('Experience removed', 'success'));

   }
   catch(err) {
      dispatch({ 
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
}
// add education
export const addEducation = (formData, history) => async dispatch => {
   try {
      const { data } = await axios.put('/api/profile/education', formData);

      dispatch({
         type: UPDATE_PROFILE,
         payload: data
      });
      dispatch(setAlert('Education added', 'success'));
      history.push('/dashboard');
   } 
   catch(err) {
      const { errors } = err.response.data;

      if(errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({ 
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
}
// delete education
export const deleteEducation = id => async dispatch => {
   try {
      const { data } = await axios.delete(`/api/profile/education/${id}`);

      dispatch({
         type: UPDATE_PROFILE,
         payload: data
      });
      dispatch(setAlert('Education removed', 'success'));

   }
   catch(err) {
      dispatch({ 
         type: PROFILE_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
      });
   }
}
// delete account
export const deleteAccount = () => async dispatch => {
   if(window.confirm('Are you absolutely sure? You CAN NOT restore your account!')) {
      try {
         await axios.delete(`/api/profile`);
   
         dispatch({ type: CLEAR_PROFILE });
         dispatch({ type: DELETE_ACCOUNT });
         dispatch(setAlert('Account permanently deleted'));
      }
      catch(err) {
         dispatch({ 
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
         });
      }
   }
}    