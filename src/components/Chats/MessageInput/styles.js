import {StyleSheet} from 'react-native';
import Color from '../../../Color';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  input: {
    maxHeight: 100,
    flex: 1,
  },
  sendButton: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Color.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
