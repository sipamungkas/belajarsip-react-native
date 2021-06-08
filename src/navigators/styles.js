import {StyleSheet} from 'react-native';
import Color from '../Color';

export default StyleSheet.create({
  notificationContainer: {
    height: 12,
    width: 12,
    borderRadius: 7,
    padding: 1,
    backgroundColor: Color.PRIMARY,
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
