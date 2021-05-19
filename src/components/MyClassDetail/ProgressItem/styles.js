import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {marginVertical: 2},
  itemContainer: {
    paddingVertical: 15,
    paddingLeft: 5,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    flex: 6,
  },
  score: {
    flex: 2,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
  },
  unfinishedContainer: {
    flex: 2,
    paddingHorizontal: 2,
  },
  unfinished: {
    backgroundColor: 'rgba(237, 210, 210, 1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 3,
  },
  unfinishedText: {
    fontSize: 12,
    color: 'rgba(186, 87, 87, 1)',
    textAlign: 'center',
  },
});
