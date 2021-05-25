import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {useRoute} from '@react-navigation/core';
import {Snackbar} from 'react-native-paper';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';

import Header from '../../components/Header';
import StudentItem from '../../components/MyClassDetail/StudentItem';
import ScoreItem from '../../components/Score/ScoreItem';
import EmptyComponent from '../../components/EmptyList';
import HeaderComponent from '../../components/Score/HeaderList';
import EditModal from '../../components/Score/EditModal';

import {getStudentScore} from '../../services/api/courses';
import styles from './styles';
import Color from '../../Color';
import {snackbarError} from '../../store/actions/snackbar';
import {errorFormatter} from '../../utils/Error';

export default function Score(props) {
  const dispatch = useDispatch();
  const [scoreList, setScoreList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [danger, setDanger] = useState(false);
  const [msg, setMsg] = useState('');
  const [data, setData] = useState({});
  const authReducer = useSelector(state => state.authReducer, shallowEqual);
  const {token} = authReducer.user;
  const route = useRoute();
  const {student, courseId} = route.params;

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const editScore = subcourse => {
    const newData = {studentId: student.user_id, courseId, subcourse, token};
    setData(newData);
    showModal();
  };

  useEffect(() => {
    getStudentScore(token, courseId, student.user_id)
      .then(res => {
        setScoreList(res.data.data);
      })
      .catch(err => {
        const errMsg = errorFormatter(err);
        dispatch(snackbarError(errMsg));
      });
  }, [token, courseId, student, dispatch]);

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
        renderItem={({item}) => (
          <ScoreItem subcourse={item} onPress={() => editScore(item)} />
        )}
      />
      <EditModal
        setSnackbar={setSnackbar}
        setMsg={setMsg}
        setDanger={setDanger}
        setScoreList={setScoreList}
        visible={visible}
        showModal={showModal}
        hideModal={hideModal}
        data={data}
      />
      <Snackbar
        theme={{
          colors: {accent: 'white'},
        }}
        style={{backgroundColor: danger ? 'red' : Color.PRIMARY}}
        visible={snackbar}
        onDismiss={() => setSnackbar(false)}
        duration={5000}
        action={{
          label: 'Ok',
          onPress: () => {
            setSnackbar(false);
          },
        }}>
        {msg}
      </Snackbar>
    </View>
  );
}
