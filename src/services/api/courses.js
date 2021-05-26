import axios from 'axios';
import {API_URL} from '@env';

export const getCourseWithFilter = (
  token,
  search,
  sort,
  currentPage,
  limit,
) => {
  return axios.get(
    `${API_URL}/v1/courses?search=${search}&sort=${sort}&page=${currentPage}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getCourseById = (token, id) => {
  return axios.get(`${API_URL}/v1/courses/${id}`, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const registerToCourse = (token, courseId) => {
  return axios.post(
    `${API_URL}/v1/courses/register`,
    {
      course_id: courseId,
    },
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  );
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

export const createCourse = (token, formData) => {
  return axios.post(`${API_URL}/v1/courses`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateCourse = (token, courseId, formData) => {
  return axios.patch(`${API_URL}/v1/courses/${courseId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};
