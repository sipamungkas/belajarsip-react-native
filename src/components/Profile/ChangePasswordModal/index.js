import React, {useState} from 'react';
import {Modal, Portal, Card, Text, Button, TextInput} from 'react-native-paper';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';

import {setIsLoading} from '../../../store/actions/loading';
import {updatePassword} from '../../../services/api/profile';
import styles from './styles';
import Color from '../../../Color';
import {errorFormatter} from '../../../utils/Error';
import {snackbarError, snackbarSuccess} from '../../../store/actions/snackbar';
import EyeIcon from '../../../assets/icons/eye-icon.svg';
import EyeSlashIcon from '../../../assets/icons/eye-slash-icon.svg';

const ChangePasswordModal = props => {
  const dispatch = useDispatch();
  const {show, setShow} = props;
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const authReducer = useSelector(state => state.authReducer, shallowEqual);
  const {token} = authReducer.user;

  const hideModal = () => setShow(false);

  const saveHandler = () => {
    hideModal();
    if (!oldPassword || !newPassword || !confirmPassword) {
      dispatch(snackbarError('Please fill all field!'));
      return;
    }

    if (newPassword !== confirmPassword) {
      dispatch(snackbarError("New Password and Password Doesn't Match"));
      return;
    }

    dispatch(setIsLoading(true));
    updatePassword(token, oldPassword, newPassword)
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

  return (
    <Portal>
      <Modal
        visible={show}
        dismissable={false}
        contentContainerStyle={styles.containerStyle}>
        <Card elevation={0} style={styles.card} theme={{roundness: 15}}>
          <Card.Title title="Change Password" />
          <Card.Content style={styles.content}>
            <TextInput
              secureTextEntry={!showPassword}
              style={styles.textInput}
              label="Password"
              value={oldPassword}
              onChangeText={text => setOldPassword(text)}
              mode="outlined"
              theme={{
                colors: {primary: Color.PRIMARY},
                roundness: 10,
              }}
              right={
                <TextInput.Icon
                  name={!showPassword ? EyeIcon : EyeSlashIcon}
                  onPress={() => setShowPassword(!showPassword)}
                  forceTextInputFocus={false}
                />
              }
            />

            <TextInput
              secureTextEntry={!showNewPassword}
              style={styles.textInput}
              label="New Password"
              value={newPassword}
              onChangeText={text => setNewPassword(text)}
              mode="outlined"
              theme={{
                colors: {primary: Color.PRIMARY},
                roundness: 10,
              }}
              right={
                <TextInput.Icon
                  name={!showNewPassword ? EyeIcon : EyeSlashIcon}
                  onPress={() => setShowNewPassword(!showNewPassword)}
                  forceTextInputFocus={false}
                />
              }
            />
            <TextInput
              secureTextEntry={!showConfirmPassword}
              style={styles.textInput}
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              mode="outlined"
              theme={{
                colors: {primary: Color.PRIMARY},
                roundness: 10,
              }}
              right={
                <TextInput.Icon
                  name={!showConfirmPassword ? EyeIcon : EyeSlashIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  forceTextInputFocus={false}
                />
              }
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

export default ChangePasswordModal;
