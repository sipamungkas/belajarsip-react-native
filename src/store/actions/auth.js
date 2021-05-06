import axios from 'axios';

import {LOGIN, LOGOUT, SET_ERROR} from './actionTypes';

import {API_URL} from '@env';

export function loginHandler(data) {
  return dispatch => {
    axios
      .post(`${API_URL}/auth/login`, data)
      .then(res => {
        dispatch({
          type: LOGIN,
          payload: res.data,
        });
      })
      .catch(err => {
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
