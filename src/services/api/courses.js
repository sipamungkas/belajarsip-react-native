import axios from 'axios';
import {API_URL} from '@env';

export const getCourseById = (token, id) => {
  return axios.get(`${API_URL}/v1/courses/${id}`, {
    headers: {Authorization: `Bearer ${token}`},
  });
};
