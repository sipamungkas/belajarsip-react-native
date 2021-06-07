import axios from 'axios';
import {API_URL} from '@env';

export const getChatList = token => {
  return axios.get(`${API_URL}/v1/chats`, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const getUsers = token => {
  return axios.get(`${API_URL}/v1/chats/users?page=1&limit=10`, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const getRoomInformation = (token, roomId) => {
  return axios.get(`${API_URL}v1/chats/rooms/${roomId}`, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const getRoomChats = (token, roomId) => {
  return axios.get(
    `${API_URL}/v1/chats/rooms/${roomId}/messages?page=1&limit=10`,
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  );
};
