import {StyleSheet} from 'react-native';
import Color from '../../Color';

export default StyleSheet.create({
  container: {
    backgroundColor: Color.PRIMARY,
    flex: 1,
  },
  content: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  subtitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: 'white',
  },
  notificationContainer: {
    marginVertical: 20,
  },
});
