import {StyleSheet} from 'react-native';
import Color from '../../Color';

export default StyleSheet.create({
  header: {
    height: 35,
    padding: 3,
    backgroundColor: Color.DEFAULT_BACKGROUND,
  },
  container: {
    flexGrow: 1,
    padding: '4%',
    backgroundColor: Color.DEFAULT_BACKGROUND,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Kanit-SemiBold',
    fontSize: 30,
    fontStyle: 'normal',
  },
  illustration: {
    marginVertical: '10%',
    marginLeft: -2,
  },
  h2: {
    fontFamily: 'Kanit-Regular',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    textAlign: 'center',
  },

  otpContainer: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 25,
    width: '100%',
  },
  otp: {
    backgroundColor: Color.DEFAULT_BACKGROUND,
    width: '15%',
    textAlign: 'center',
    fontFamily: 'Kanit-SemiBold',
    fontSize: 40,
    fontStyle: 'normal',
  },
  otpContent: {},
  email: {height: 50},
  btnContainer: {
    width: '100%',
  },
  loginBtn: {backgroundColor: Color.PRIMARY, padding: 3, width: '100%'},
});
