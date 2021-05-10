import {StyleSheet} from 'react-native';

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 30,
    borderRadius: 10,
    marginRight: 5,
  },
  item: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',

    minHeight: 30,
    height: hp(10),
    borderRadius: 10,
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
});

export default styles;
