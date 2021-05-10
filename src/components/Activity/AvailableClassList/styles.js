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
});

export default styles;
