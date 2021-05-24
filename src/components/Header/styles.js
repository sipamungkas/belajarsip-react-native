import {StyleSheet} from 'react-native';
import Color from '../../Color';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    minHeight: 75,
    backgroundColor: Color.PRIMARY,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 15,
  },
  profileContainer: {
    // height: hp(20),
  },
  profileDetail: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  avatar: {width: 50, height: 50, marginRight: 20},
  profileName: {color: 'white', fontFamily: 'Roboto-Medium', fontSize: 18},
  profileNameSkeleton: {width: 120, height: 20, borderRadius: 4},
  online: {color: 'white', fontFamily: 'Roboto-Regular', fontSize: 14},
  onlineSkeleton: {marginTop: 6, width: 50, height: 20, borderRadius: 4},
  main: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Kanit-Medium',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'white',
  },
  titleProfile: {
    marginBottom: 10,
  },
});
