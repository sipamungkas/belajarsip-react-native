import axios from 'axios';
import {API_URL} from '@env';

export const getProfile = token => {
  return axios.get(`${API_URL}/v1/profile`, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const updateName = (token, name) => {
  return axios.patch(
    `${API_URL}/v1/profile`,
    {name},
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  );
};

export const updatePhoneNumber = (token, phone) => {
  return axios.patch(
    `${API_URL}/v1/profile`,
    {phone},
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  );
};

export const updatePassword = (token, oldPassword, newPassword) => {
  return axios.patch(
    `${API_URL}/v1/profile`,
    {old_password: oldPassword, new_password: newPassword},
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  );
};
