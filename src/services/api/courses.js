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

export const getStudentScore = (token, courseId, studentId) => {
  return axios.get(`${API_URL}/v1/courses/${courseId}/students/${studentId}`, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const createScore = (token, courseId, subcourseId, studentId, score) => {
  return axios.post(
    `${API_URL}/v1/courses/${courseId}/students`,
    {
      subcourse_id: subcourseId,
      student_id: studentId,
      score: score || 0,
    },
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  );
};

export const updateScore = (token, courseId, subcourseId, studentId, score) => {
  return axios.patch(
    `${API_URL}/v1/courses/${courseId}/students/${studentId}`,
    {
      subcourse_id: subcourseId,
      score: score || 0,
    },
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  );
};
