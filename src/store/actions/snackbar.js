import {
  SET_SNACKBAR_ERROR,
  SET_SNACKBAR_SUCCESS,
  SET_SNACKBAR_HIDE,
} from './actionTypes';

export function snackbarSuccess(msg) {
  return {
    type: SET_SNACKBAR_SUCCESS,
    payload: msg,
  };
}

export function snackbarError(msg) {
  return {type: SET_SNACKBAR_ERROR, payload: msg};
}

export function snackbarHide() {
  return {
    type: SET_SNACKBAR_HIDE,
  };
}
