import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useDispatch} from 'react-redux';

import StudentItem from '../StudentItem';
import {getStudentList} from '../../../services/api/courses';
import {Card} from 'react-native-paper';
import {errorFormatter} from '../../../utils/Error';
import {snackbarError} from '../../../store/actions/snackbar';

export default function StudentList(props) {
  const dispatch = useDispatch();
  const [studentList, setStudentList] = useState([]);
  const {token, courseId} = props;
  useEffect(() => {
    getStudentList(token, courseId)
      .then(res => {
        setStudentList(res.data.data);
      })
      .catch(err => {
        const msg = errorFormatter(err);
        dispatch(snackbarError(msg));
      });
  }, [token, courseId, dispatch]);
  return (
    <View>
      {studentList.length === 0 && (
        <Card>
          <Text>No Student</Text>
        </Card>
      )}
      {studentList.map(student => (
        <StudentItem
          student={student}
          key={student.user_id}
          onPress={() =>
            props.navigation.navigate('Score', {
              student: student,
              courseId: courseId,
            })
          }
        />
      ))}
    </View>
  );
}
