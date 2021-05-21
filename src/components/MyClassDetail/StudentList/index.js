import React, {useState, useEffect} from 'react';
import {View, Alert, Text} from 'react-native';
import StudentItem from '../StudentItem';
import {getStudentList} from '../../../services/api/courses';
import {Card} from 'react-native-paper';

export default function StudentList(props) {
  const [studentList, setStudentList] = useState([]);
  const {token, courseId} = props;
  useEffect(() => {
    getStudentList(token, courseId)
      .then(res => {
        setStudentList(res.data.data);
      })
      .catch(err => {
        Alert.alert(
          'Error',
          err?.response?.data?.message ||
            err.message ||
            'Something went wrong!',
        );
      });
  }, [token, courseId]);
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
          onPress={() => props.navigation.navigate('ActivityHome')}
        />
      ))}
    </View>
  );
}
