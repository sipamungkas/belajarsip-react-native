import {StyleSheet} from 'react-native';
import Color from '../../../Color';

export default StyleSheet.create({
  containerStyle: {padding: 20},
  card: {
    padding: 10,
  },
  content: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  textInput: {backgroundColor: 'white'},
  actions: {
    marginTop: 20,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  btnCancel: {
    shadowColor: 'white',
  },
  btnOk: {
    shadowColor: 'white',
    marginLeft: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 20,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    marginBottom: 20,
  },
});
