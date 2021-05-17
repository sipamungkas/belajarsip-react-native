import {StyleSheet, StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Color from '../../Color';

export default StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: StatusBar.currentHeight + 115,
    width: '100%',
    flexGrow: 1,
    backgroundColor: 'red',
  },
  imageBackground: {
    width: '100%',
    transform: [{translateY: -20}],
  },
  information: {
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    transform: [{translateY: 80 / 2}],
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBackground: {
    position: 'relative',
    width: 100,
    height: 100,
    backgroundColor: Color.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 15,
    marginRight: 20,
  },
  categoryIcon: {
    width: '100%',
    height: '100%',
  },
  informationText: {
    // width: '100%',
    backgroundColor: 'goldenrod',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    fontStyle: 'normal',
    textAlign: 'left',
  },
  subInformationText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontStyle: 'normal',
    textAlign: 'left',
    marginRight: 10,
  },
});
