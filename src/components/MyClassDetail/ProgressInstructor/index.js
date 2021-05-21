import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';

import {getSubcourseByCourseId} from '../../../services/api/courses';
import ProgressItemInstructor from '../ProgressItemInstructor';

export default function Progress(props) {
  const {token, courseId} = props;
  const [progressList, setProgressList] = useState([]);
  useEffect(() => {
    getSubcourseByCourseId(token, courseId)
      .then(res => {
        setProgressList(res.data.data);
      })
      .catch(err => {
        Alert.alert(
          'Error',
          err?.response?.data?.message ||
            err.message ||
            'Something went wrong!',
        );
      });
  }, [courseId, token]);

  return (
    <View>
      {progressList.map((item, index) => (
        <ProgressItemInstructor key={index} subcourse={item} />
      ))}
    </View>
  );
}
