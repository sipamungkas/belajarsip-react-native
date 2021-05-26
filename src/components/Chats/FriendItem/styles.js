import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  avatar: {
    marginRight: 20,
  },
  container: {flexDirection: 'row', alignItems: 'center'},
  middle: {
    flex: 7,
  },
  name: {
    fontFamily: 'Kanit-Regular',
    fontSize: 18,
  },
  content: {
    fontFamily: 'Kanit-Regular',
    fontSize: 13,
    color: 'rgba(120, 120, 120, 1)',
  },
  time: {
    marginLeft: 2,
    flex: 2,
    alignItems: 'flex-end',
  },
});
