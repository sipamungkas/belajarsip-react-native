import {StyleSheet} from 'react-native';
import Color from '../../../Color';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  input: {
    marginVertical: 5,
    maxHeight: 100,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 10,
    paddingLeft: 10,
  },
  sendButton: {
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    backgroundColor: Color.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
