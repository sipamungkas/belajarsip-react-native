import React from 'react';
import {Portal, Modal, Text, ActivityIndicator} from 'react-native-paper';

import SuccessIcon from '../../assets/icons/success-checklist-icon.svg';
import Color from '../../Color';
import styles from './styles';

function SuccessModal(props) {
  switch (props.type) {
    case 'success':
      return (
        <Portal>
          <Modal style={styles.modal} visible={props.visible}>
            <Text style={styles.message}>{props.message || 'Success'}</Text>
            <SuccessIcon style={styles.icon} />
            {props.callbackComponent || ''}
          </Modal>
        </Portal>
      );

    case 'loading':
      return (
        <Portal>
          <Modal style={styles.modalLoading} visible={props.visible}>
            <Text style={styles.messageloading}>
              {props.message || 'Please wait...'}
            </Text>
            <ActivityIndicator
              style={styles.icon}
              animating={true}
              size={'large'}
              color={Color.PRIMARY}
            />
          </Modal>
        </Portal>
      );
    default:
      break;
  }
}

export default SuccessModal;
