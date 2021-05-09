import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Color from '../../../Color';

export default StyleSheet.create({
  container: {
    marginTop: '5%',
    width: '100%',
    backgroundColor: Color.BACKGROUND,
    padding: '3%',
  },
  item: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
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
  title: {
    textAlign: 'left',
  },
});
