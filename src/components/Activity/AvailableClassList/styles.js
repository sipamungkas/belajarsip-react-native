import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    // alignContent: 'center',
    minHeight: 30,
    height: hp(10),
    borderRadius: 10,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  score: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'rgba(81, 231, 43, 1)',
  },
  courseList: {
    marginVertical: 12,
  },
  pageCount: {
    marginTop: 10,
  },
  pageContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
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

export default styles;
