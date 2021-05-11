import axios from 'axios';

import {LOGIN, LOGOUT, SET_ERROR} from './actionTypes';

import {API_URL} from '@env';

export function loginHandler(username, password) {
  return function (dispatch) {
    console.log(`${API_URL}/v1`);
    return axios
      .post(`${API_URL}/v1/auth/login`, {username, password})
      .then(res => {
        // console.log(res.data.data);
        dispatch({
          type: LOGIN,
          payload: res.data.data,
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: SET_ERROR,
          payload: err,
        });
      });
  };
}

export function logoutHandler() {
  return dispatch => {
    dispatch({type: LOGOUT});
  };
}
