import {LOGIN, SET_ERROR, SET_LOADING, LOGOUT} from '../actions/actionTypes';

const initialState = {
  user: {},
  isLoggedIn: false,
  isError: false,
  error: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING: {
      return {
        ...state,
        isError: false,
      };
    }
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        isError: false,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isError: true,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: {},
      };
    default:
      return state;
  }
};
