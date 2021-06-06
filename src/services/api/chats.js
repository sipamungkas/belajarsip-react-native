import axios from 'axios';
import {API_URL} from '@env';

export const getChatList = token => {
  return axios.get(`${API_URL}/v1/chats`, {
    headers: {Authorization: `Bearer ${token}`},
  });
};
