import React, {useState} from 'react';
import {Image, Platform} from 'react-native';
import {Modal, Portal, Card, Button, Avatar} from 'react-native-paper';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {setIsLoading} from '../../../store/actions/loading';
import {updateAvatar} from '../../../services/api/profile';
import Color from '../../../Color';
import styles from './styles';
import {errorFormatter} from '../../../utils/Error';
import {snackbarError, snackbarSuccess} from '../../../store/actions/snackbar';
import {API_URL} from '@env';

const ChangeAvatarModal = props => {
  const dispatch = useDispatch();
  const {show, setShow, avatar} = props;
  const [image, setImage] = useState();
  const authReducer = useSelector(state => state.authReducer, shallowEqual);
  const {token, name} = authReducer.user;
  let avatarSrc = avatar || null;

  const hideModal = () => setShow(false);

  const saveHandler = () => {
    hideModal();
    if (!image) {
      dispatch(snackbarError('Image Can not be empty!'));
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri:
        Platform.OS === 'android'
          ? image?.uri
          : image.uri.replace('file://', ''),
      name: image.fileName,
      type: 'image/*',
    });
    dispatch(setIsLoading(true));
    updateAvatar(token, formData)
      .then(res => {
        const msg = res.data.message;
        setImage(null);
        dispatch(snackbarSuccess(msg));
        dispatch(setIsLoading(false));
      })
      .catch(err => {
        const msg = errorFormatter(err);
        setImage(null);
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
          <Card.Title title="Change Avatar" />
          <Card.Content style={styles.content}>
            {avatar !== null || image ? (
              <Image
                style={[styles.avatar, {borderRadius: 100 / 2}]}
                height={100}
                width={100}
                source={{uri: image?.uri || `${API_URL}/images/${avatarSrc}`}}
                resizeMode="cover"
                resizeMethod="auto"
                onError={() => {
                  avatarSrc = null;
                }}
              />
            ) : (
              <Avatar.Text
                style={[styles.avatar, {backgroundColor: 'white'}]}
                color={Color.PRIMARY}
                size={50}
                label={name?.slice(0, 1)}
              />
            )}
            <Button
              onPress={() => {
                launchCamera(
                  {
                    mediaType: 'photo',
                    includeBase64: false,
                    maxHeight: 200,
                    maxWidth: 200,
                  },
                  img => {
                    setImage(img);
                  },
                );
              }}>
              Take a Photo
            </Button>
            <Button
              onPress={() => {
                launchImageLibrary(
                  {
                    mediaType: 'photo',
                    includeBase64: false,
                    maxHeight: 200,
                    maxWidth: 200,
                  },
                  img => {
                    setImage(img);
                  },
                );
              }}>
              Choose from gallery
            </Button>
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

export default ChangeAvatarModal;
