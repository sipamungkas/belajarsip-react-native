import {StyleSheet} from 'react-native';

import Color from '../../Color';

const styles = StyleSheet.create({
  header: {
    padding: 3,
    backgroundColor: Color.DEFAULT_BACKGROUND,
  },
  container: {
    flexGrow: 1,
    padding: '4%',
    backgroundColor: Color.DEFAULT_BACKGROUND,
  },
  apiError: {fontSize: 16, marginBottom: 20, textAlign: 'center'},
  title: {
    textAlign: 'center',
    fontFamily: 'Kanit-SemiBold',
    fontSize: 30,
    fontStyle: 'normal',
  },
  subtitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontStyle: 'normal',
    textAlign: 'center',
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  errors: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  callbackComponent: {
    fontSize: 15,
    textAlign: 'center',
  },
  loginBtn: {
    backgroundColor: Color.PRIMARY,
    padding: 3,
    width: '100%',
  },
});

export default styles;
