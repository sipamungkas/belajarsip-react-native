import axios from 'axios';
import {API_URL} from '@env';

export const getNotifications = token => {
  return axios.get(`${API_URL}/v1/notifications`, {
    headers: {Authorization: `Bearer ${token}`},
  });
};
