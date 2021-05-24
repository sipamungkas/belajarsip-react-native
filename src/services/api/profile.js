import axios from 'axios';
import {API_URL} from '@env';

export const getProfile = token => {
  return axios.get(`${API_URL}/v1/profile`, {
    headers: {Authorization: `Bearer ${token}`},
  });
};
