import React, {useEffect, useState} from 'react';
import {Modal, Portal, Card, Text, Button, TextInput} from 'react-native-paper';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';

import {setIsLoading} from '../../../store/actions/loading';
import {updateName} from '../../../services/api/profile';
import Color from '../../../Color';
import styles from './styles';
import {errorFormatter} from '../../../utils/Error';
import {snackbarError, snackbarSuccess} from '../../../store/actions/snackbar';

const ChangeNameModal = props => {
  const dispatch = useDispatch();
  const {show, setShow, name: defaultValue} = props;
  const [name, setName] = useState('');
  const authReducer = useSelector(state => state.authReducer, shallowEqual);
  const {token} = authReducer.user;

  const hideModal = () => setShow(false);

  const saveHandler = () => {
    hideModal();
    if (!name) {
      dispatch(snackbarError('Name Can not be empty!'));
      return;
    }

    dispatch(setIsLoading(true));
    updateName(token, name)
      .then(res => {
        const msg = res.data.message;
        dispatch(snackbarSuccess(msg));
        dispatch(setIsLoading(false));
      })
      .catch(err => {
        const msg = errorFormatter(err);
        dispatch(snackbarError(msg));
        dispatch(setIsLoading(false));
      });
  };

  useEffect(() => {
    setName(defaultValue);
  }, [defaultValue]);

  return (
    <Portal>
      <Modal
        visible={show}
        dismissable={false}
        contentContainerStyle={styles.containerStyle}>
        <Card elevation={0} style={styles.card} theme={{roundness: 15}}>
          <Card.Title title="Change Name" />
          <Card.Content style={styles.content}>
            <TextInput
              style={[styles.textInput]}
              label="Name"
              value={name}
              onChangeText={text => setName(text)}
              mode="outlined"
              theme={{
                colors: {primary: Color.PRIMARY},
                roundness: 10,
              }}
            />
          </Card.Content>
          <Card.Actions style={styles.actions}>
            {/* <View style={styles.actionContainer}> */}
            <Button
              mode="contained"
              color={Color.DANGER}
              onPress={hideModal}
              style={styles.btnCancel}>
              Cancel
            </Button>
            <Button
              mode="contained"
              style={styles.btnOk}
              color={Color.PRIMARY}
              onPress={saveHandler}>
              Save
            </Button>
            {/* </View> */}
          </Card.Actions>
        </Card>
      </Modal>
    </Portal>
  );
};

export default ChangeNameModal;
