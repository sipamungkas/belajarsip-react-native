import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  modalLoading: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'transparent',
  },
  message: {
    fontSize: 30,
    alignSelf: 'center',
  },
  messageloading: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'rgba(255,255,255,0.8)',
  },
  icon: {
    alignSelf: 'center',
    marginVertical: '10%',
  },
});

export default styles;
