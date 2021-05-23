import {SET_IS_LOADING} from './actionTypes';

export const setIsLoading = (value, msg) => {
  return {
    type: SET_IS_LOADING,
    payload: {value, msg},
  };
};
