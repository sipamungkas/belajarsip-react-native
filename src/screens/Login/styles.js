import {StyleSheet} from 'react-native';

import Color from '../../Color';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
    padding: '5%',
  },

  loginText: {
    textAlign: 'center',
    fontFamily: 'Kanit-Regular',
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: '500',
  },

  form: {marginTop: '20%', marginBottom: '20%'},
  username: {marginBottom: '5%'},
  textInput: {
    borderRadius: 50,
  },
  forgotText: {
    textAlign: 'right',
    fontSize: 13,
    marginTop: '3%',
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal',
  },
  loginBtn: {backgroundColor: Color.PRIMARY, padding: 2},
  googleBtn: {
    marginTop: 10,
    backgroundColor: 'rgba(0, 13, 79, 0.08)',
    shadowColor: 'rgba(0,0,0,0.01)',
    padding: 2,
  },
  btnText: {
    fontFamily: 'Kanit-Regular',
    color: 'black',
  },
});

export default styles;
