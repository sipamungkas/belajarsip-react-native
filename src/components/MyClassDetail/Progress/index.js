import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';

import {getSubcourseByCourseId} from '../../../services/api/courses';
import {snackbarError} from '../../../store/actions/snackbar';
import {errorFormatter} from '../../../utils/Error';
import ProgressItem from '../ProgressItem';

export default function Progress(props) {
  const dispatch = useDispatch();
  const {token, courseId} = props;
  const [progressList, setProgressList] = useState([]);
  useEffect(() => {
    getSubcourseByCourseId(token, courseId)
      .then(res => setProgressList(res.data.data))
      .catch(err => {
        const msg = errorFormatter(err);
        dispatch(snackbarError(msg));
      });
  }, [courseId, token, dispatch]);

  return (
    <View>
      {progressList.map((item, index) => (
        <ProgressItem key={index} subcourse={item} />
      ))}
    </View>
  );
}
