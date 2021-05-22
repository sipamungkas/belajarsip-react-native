import React, {useState, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Modal, Button, Portal, Card} from 'react-native-paper';
import Color from '../../../Color';
import {createScore, updateScore} from '../../../services/api/courses';

export default function EditModal(props) {
  const {visible, hideModal, data} = props;
  const [score, setScore] = useState();
  const containerStyle = {padding: 20};
  useEffect(() => {
    setScore(undefined);
    if (data?.subcourse?.score) {
      setScore(`${data.subcourse.score}`);
    }
  }, [data]);

  const saveHandler = () => {
    const propsScore = data.subcourse.score;
    console.log(propsScore);
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
          console.log(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
      hideModal();
      return;
    } else {
      console.log(':update');
      updateScore(
        data.token,
        data.courseId,
        data.subcourse.id,
        data.studentId,
        score,
      )
        .then(res => {
          console.log(res.data.data);
        })
        .catch(err => {
          console.log(err.response.data);
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
