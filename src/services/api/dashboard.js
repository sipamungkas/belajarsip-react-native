import axios from 'axios';
import {API_URL} from '@env';

export const getAllCourseByDate = (token, date) => {
  console.log(`${API_URL}/v1/dashboard/${date}/all`);
  return axios.get(`${API_URL}/v1/dashboard/${date}/all`, {
    headers: {Authorization: `Bearer ${token}`},
  });
};
