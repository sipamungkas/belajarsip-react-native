import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 10,
  },
  thead: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  pageCount: {
    marginTop: 10,
  },
  pageContainer: {flexDirection: 'row', marginTop: 5, alignSelf: 'flex-end'},
  pageItem: {
    margin: 5,
  },
  page: {
    width: 35,
    height: 35,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
