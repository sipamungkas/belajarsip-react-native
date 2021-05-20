import {StyleSheet} from 'react-native';

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    // alignContent: 'center',
    minHeight: 30,
    height: hp(10),
    borderRadius: 10,
    // backgroundColor: 'goldenrod',
  },
  time: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  titleContainer: {flex: 1},
  title: {
    paddingLeft: 10,
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  studentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  studentCount: {
    marginRight: 5,
  },
  dateList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default styles;
