import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  firstRow: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  welcome: {
    justifyContent: 'space-between',
    fontFamily: 'Kanit-Regular',
    fontSize: 18,
    fontStyle: 'normal',
    color: 'white',
  },
  name: {
    justifyContent: 'space-between',
    fontFamily: 'Kanit-SemiBold',
    fontSize: 20,
    fontStyle: 'normal',
    color: 'white',
  },
});

export default styles;
