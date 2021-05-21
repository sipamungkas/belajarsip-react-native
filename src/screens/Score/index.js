import React, {useEffect, useState} from 'react';
import {View, FlatList, Alert, Text} from 'react-native';

import {useRoute} from '@react-navigation/core';
import {shallowEqual, useSelector} from 'react-redux';

import Header from '../../components/Header';
import StudentItem from '../../components/MyClassDetail/StudentItem';
import ScoreItem from '../../components/Score/ScoreItem';
import EmptyComponent from '../../components/EmptyList';
import HeaderComponent from '../../components/Score/HeaderList';

import {getStudentScore} from '../../services/api/courses';
import styles from './styles';

export default function Score(props) {
  const [scoreList, setScoreList] = useState([]);
  const authReducer = useSelector(state => state.authReducer, shallowEqual);
  const {token} = authReducer.user;
  const route = useRoute();
  const {student, courseId} = route.params;

  useEffect(() => {
    getStudentScore(token, courseId, student.user_id)
      .then(res => {
        setScoreList(res.data.data);
      })
      .catch(err => {
        Alert.alert(
          'Error',
          err?.response?.data?.message ||
            err.message ||
            'Something went wrong!',
        );
      });
  }, [token, courseId, student]);

  return (
    <View style={styles.container}>
      <Header {...props} title="Score" back />
      <StudentItem student={student} ellipsis={false} />
      <FlatList
        ListEmptyComponent={<EmptyComponent />}
        ListHeaderComponent={<HeaderComponent />}
        data={scoreList}
        style={{marginTop: 10}}
        contentContainerStyle={{paddingHorizontal: 10}}
        renderItem={({item}) => <ScoreItem subcourse={item} />}
      />
    </View>
  );
}
