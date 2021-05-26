import {StyleSheet} from 'react-native';
import Color from '../../../Color';

export default StyleSheet.create({
  container: {
    zIndex: 1,
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
    flex: 5,
  },
  titleProfile: {
    marginBottom: 10,
  },

  options: {
    marginTop: 20,
    flexDirection: 'row',

    justifyContent: 'center',
  },
  icon: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 2,
    fontFamily: 'Roboto-SemiBold',
    color: 'white',
  },
  iconContainer: {
    marginHorizontal: '10%',
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
