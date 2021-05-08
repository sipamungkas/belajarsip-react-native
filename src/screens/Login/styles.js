import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
  },

  loginText: {
    textAlign: 'center',
    fontFamily: 'Kanit-Medium',
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  form: {marginVertical: '10%'},
  forgotText: {textAlign: 'right', fontSize: 13, marginTop: '5%'},
  loginBtn: {backgroundColor: 'rgba(87, 132, 186, 1)', marginTop: '10%'},
  googlebtn: {marginTop: 10},
});

export default styles;
