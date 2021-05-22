import React, {useState, useEffect} from 'react';
import {Text, TextInput} from 'react-native';
import {Modal, Button, Portal, Card} from 'react-native-paper';
import Color from '../../../Color';
import {
  createScore,
  updateScore,
  getStudentScore,
} from '../../../services/api/courses';

export default function EditModal(props) {
  const {
    visible,
    hideModal,
    data,
    setDanger,
    setMsg,
    setSnackbar,
    setScoreList,
  } = props;
  const [score, setScore] = useState();
  const containerStyle = {padding: 20};
  useEffect(() => {
    setScore(undefined);
    if (data?.subcourse?.score) {
      setScore(`${data.subcourse.score}`);
    }
  }, [data]);

  const scoreValidation = () => {
    const floatScore = parseFloat(score);
    if (floatScore > 100 || floatScore < 0) {
      setDanger(true);
      setMsg('Score must be betwen 1 - 100');
      setSnackbar(true);
      hideModal();
      return false;
    }
    return true;
  };

  const refreshScoreList = () => {
    getStudentScore(data.token, data.courseId, data.studentId)
      .then(res => {
        setScoreList(res.data.data);
      })
      .catch(err => {
        setDanger(true);
        setMsg(
          err?.response?.data?.message ||
            err?.message ||
            'Something went wrong!',
        );
        setSnackbar(true);
      });
  };

  const saveHandler = () => {
    if (!scoreValidation()) {
      return;
    }

    const propsScore = data.subcourse.score;
    if (propsScore === undefined || propsScore === null || propsScore === '') {
      console.log('create');
      createScore(
        data.token,
        data.courseId,
        data.subcourse.id,
        data.studentId,
        score,
      )
        .then(res => {
          setMsg(res?.data?.message || 'Success');
          refreshScoreList();
          setSnackbar(true);
        })
        .catch(err => {
          setDanger(true);
          setMsg(
            err?.response?.data?.message ||
              err?.message ||
              'Something went wrong!',
          );
          setSnackbar(true);
        });
      hideModal();
      return;
    } else {
      updateScore(
        data.token,
        data.courseId,
        data.subcourse.id,
        data.studentId,
        score,
      )
        .then(res => {
          setMsg(res?.data?.message || 'Success');
          refreshScoreList();
          setSnackbar(true);
        })
        .catch(err => {
          setDanger(true);
          setMsg(
            err?.response?.data?.message ||
              err?.message ||
              'Something went wrong!',
          );
          setSnackbar(true);
        });
      hideModal();
      return;
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <Card elevation={0}>
          <Card.Title title="Edit Score" />
          <Card.Content style={{flexDirection: 'row', alignContent: 'center'}}>
            <Text
              style={{
                flex: 4,
                textAlignVertical: 'center',
              }}
              numberOfLines={1}>
              {data?.subcourse?.title || 'Please select student'}
            </Text>
            <TextInput
              keyboardType="decimal-pad"
              maxLength={4}
              value={score}
              onChangeText={text => setScore(text)}
              onFocus={() => setScore('')}
              style={{flex: 1, textAlign: 'center'}}
              underlineColorAndroid="black"
            />
          </Card.Content>
          <Card.Actions
            style={{
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Button color="red" onPress={hideModal}>
              Cancel
            </Button>
            <Button color={Color.PRIMARY} onPress={saveHandler}>
              Save
            </Button>
          </Card.Actions>
        </Card>
      </Modal>
    </Portal>
  );
}
