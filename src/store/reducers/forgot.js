import {SET_FORGOT_EMAIL, SET_FORGOT_OTP} from '../actions/actionTypes';

const initialState = {
  email: '',
  otp: '',
};

export const forgotReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORGOT_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case SET_FORGOT_EMAIL:
      return {
        ...state,
        otp: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
