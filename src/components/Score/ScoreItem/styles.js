import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {
    // marginVertical: 2,
  },
  content: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  name: {
    flex: 4,
    fontFamily: 'Roboto-Regular',
  },
  score: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
  },
  more: {
    width: 20,
  },
});
