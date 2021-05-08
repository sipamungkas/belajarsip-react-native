import {LOGIN, SET_ERROR, SET_LOADING, LOGOUT} from '../actions/actionTypes';

const initialState = {
  user: {},
  isLoggedIn: false,
  isError: false,
  isLoading: false,
  error: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        isError: false,
        isLoading: false,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isError: true,
        isLoading: false,
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
