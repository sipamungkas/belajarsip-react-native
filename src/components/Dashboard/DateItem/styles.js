import {StyleSheet} from 'react-native';
import Color from '../../../Color';

export default StyleSheet.create({
  surface: {
    padding: 2,
    height: 60,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingVertical: 10,
  },
  active: {
    elevation: 1,
    backgroundColor: Color.PRIMARY,
  },
  inActive: {
    marginBottom: 5,
    color: 'black',
  },
  activeText: {
    color: 'white',
  },
});
