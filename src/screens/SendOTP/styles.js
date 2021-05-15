import {StyleSheet} from 'react-native';
import Color from '../../Color';

export default StyleSheet.create({
  header: {
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
  },
  h2: {
    fontFamily: 'Kanit-Regular',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    textAlign: 'center',
  },
  h3: {
    marginTop: '4%',
    fontFamily: 'Kanit-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    textAlign: 'center',
    color: 'rgba(131, 127, 143, 1)',
  },
  emailContainer: {
    marginTop: 25,
    width: '100%',
  },
  email: {height: 50},
  btnContainer: {
    width: '100%',
  },
  loginBtn: {backgroundColor: Color.PRIMARY, padding: 3, width: '100%'},
});
