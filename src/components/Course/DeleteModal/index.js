import React, {useState} from 'react';
import {Text} from 'react-native';
import {Modal, Portal, Button, Card} from 'react-native-paper';

import Color from '../../../Color';
import styles from './styles';

export default function DeleteModal(props) {
  const {show, setShow, deleteHandler} = props;

  const hideModal = () => setShow(false);
  return (
    <Portal>
      <Modal
        visible={show}
        dismissable={false}
        contentContainerStyle={styles.containerStyle}>
        <Card elevation={0} style={styles.card} theme={{roundness: 15}}>
          <Card.Title title="Delete Course" />
          <Card.Content style={styles.content}>
            <Text>Are you sure you want to delete this course?</Text>
          </Card.Content>
          <Card.Actions style={styles.actions}>
            {/* <View style={styles.actionContainer}> */}
            <Button
              mode="contained"
              style={styles.btnDelete}
              color={Color.DANGER}
              onPress={deleteHandler}>
              Delete
            </Button>
            <Button
              mode="contained"
              color={Color.PRIMARY}
              onPress={hideModal}
              style={styles.btnCancel}>
              Cancel
            </Button>

            {/* </View> */}
          </Card.Actions>
        </Card>
      </Modal>
    </Portal>
  );
}
