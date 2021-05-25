import {
  SET_SNACKBAR_SUCCESS,
  SET_SNACKBAR_ERROR,
  SET_SNACKBAR_HIDE,
} from '../actions/actionTypes';

const initialState = {
  snackbar: false,
  msg: '',
  danger: false,
};

export const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SNACKBAR_SUCCESS:
      return {
        ...state,
        snackbar: true,
        msg: action.payload,
        danger: false,
      };

    case SET_SNACKBAR_ERROR:
      return {
        ...state,
        snackbar: true,
        msg: action.payload,
        danger: true,
      };
    case SET_SNACKBAR_HIDE:
      return {
        ...state,
        snackbar: false,
        msg: '',
      };
    default:
      return {
        ...state,
      };
  }
};
