import axios from 'axios';
import {API_URL} from '@env';

export const sendOTP = email => {
  return axios.post(`${API_URL}/v1/auth/forgot`, {email});
};
