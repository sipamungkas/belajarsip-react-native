import axios from 'axios';
import {API_URL} from '@env';

export const sendOTP = email => {
  return axios.post(`${API_URL}/v1/auth/forgot`, {email});
};

export const otpVerification = (email, otp) => {
  return axios.post(`${API_URL}/v1/auth/verify-otp`, {email, otp});
};

export const newPassword = (email, otp, password) => {
  return axios.post(`${API_URL}/v1/auth/new-password`, {email, otp, password});
};
