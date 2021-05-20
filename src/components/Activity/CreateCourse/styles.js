import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    fontStyle: 'normal',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    marginRight: 5,
  },
  descriptionContainer: {
    alignItems: 'flex-start',
  },
  description: {
    marginTop: 15,
    backgroundColor: 'rgba(235, 235, 235, 1)            ',
    width: '100%',
  },
});
