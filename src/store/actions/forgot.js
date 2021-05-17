import {SET_FORGOT_EMAIL, SET_FORGOT_OTP} from './actionTypes';

export function setEmail(email) {
  return {
    type: SET_FORGOT_EMAIL,
    payload: email,
  };
}

export function setOTP(otp) {
  return {
    type: SET_FORGOT_OTP,
    payload: otp,
  };
}
