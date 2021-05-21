import axios from 'axios';
import {API_URL} from '@env';

export const getCourseById = (token, id) => {
  return axios.get(`${API_URL}/v1/courses/${id}`, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const getSubcourseByCourseId = (token, id) => {
  return axios.get(`${API_URL}/v1/courses/${id}/subcourses`, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const getStudentList = (token, courseId) => {
  return axios.get(`${API_URL}/v1/courses/${courseId}/students`, {
    headers: {Authorization: `Bearer ${token}`},
  });
};
