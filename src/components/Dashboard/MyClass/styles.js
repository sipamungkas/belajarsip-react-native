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
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  containerTitleText: {
    fontFamily: 'Kanit-Regular',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    color: 'rgba(1, 6, 32, 1)',
  },
  containerSubtitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    color: 'rgba(77, 80, 91, 1)',
  },
  tabs: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  tabItem: {
    marginHorizontal: 5,
  },
});
