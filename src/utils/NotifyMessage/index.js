import {ToastAndroid, Alert, Platform} from 'react-native';

function notifyMessage(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert('Alert', msg);
  }
}
export default notifyMessage;
