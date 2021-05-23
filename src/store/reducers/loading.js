import {SET_IS_LOADING} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  msg: '',
};

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.value,
        msg: action.payload.msg,
      };

    default:
      return {
        ...state,
      };
  }
};
