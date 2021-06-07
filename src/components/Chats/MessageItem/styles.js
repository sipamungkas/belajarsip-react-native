import {StyleSheet} from 'react-native';
import Color from '../../../Color';

export default StyleSheet.create({
  card: {
    marginVertical: 10,
  },
  sender: {
    fontSize: 16,
    color: Color.PRIMARY,
    marginBottom: 10,
  },
  me: {
    color: 'white',
  },
  content: {
    color: 'black',
  },
  senderContent: {
    color: 'white',
    textAlign: 'right',
  },
  time: {
    textAlign: 'right',
    fontSize: 12,
    marginTop: 20,
    color: 'rgba(0,0,0,0.4)',
  },
  timeSender: {
    color: 'rgba(255,255,255,0.4)',
  },
});
