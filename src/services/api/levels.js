import axios from 'axios';
import {API_URL} from '@env';

export const getLevels = token => {
  return axios.get(`${API_URL}/v1/levels`, {
    headers: {Authorization: `Bearer ${token}`},
  });
};
