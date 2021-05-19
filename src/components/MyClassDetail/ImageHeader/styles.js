import {StyleSheet} from 'react-native';

import COLOR from '../../../Color';

export default StyleSheet.create({
  imageBackground: {
    backgroundColor: 'red',
    width: '100%',
    marginBottom: 50,
  },
  imageOverlay: {
    backgroundColor: '#EDEDED',
    opacity: 0.5,
    height: '100%',
    width: '100%',
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
    backgroundColor: COLOR.PRIMARY,
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
