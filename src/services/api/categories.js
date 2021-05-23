import axios from 'axios';
import {API_URL} from '@env';

export const getCategories = token => {
  return axios.get(`${API_URL}/v1/categories`, {
    headers: {Authorization: `Bearer ${token}`},
  });
};
