import {StyleSheet} from 'react-native';
import Color from '../../Color';

export default StyleSheet.create({
  container: {
    paddingTop: 5,
    // paddingBottom: StatusBar.currentHeight + 115,
    width: '100%',
    flexGrow: 1,
    backgroundColor: 'white',
  },
  content: {
    backgroundColor: 'goldenrod',
    paddingBottom: 10,
  },
  menuList: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  menuContainer: {
    transform: [{translateY: 2}],
    padding: 10,
    marginHorizontal: 5,
    // borderBottomColor: Color.PRIMARY,
    // borderBottomWidth: 2,
  },
  active: {
    borderBottomWidth: 3,
    borderBottomColor: Color.PRIMARY,
  },
  menuText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    textAlign: 'left',
  },
  activeText: {
    fontWeight: 'bold',
  },
  fab: {
    backgroundColor: Color.PRIMARY,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 50 / 2,

    position: 'absolute',
    right: 16,
    bottom: 5,
  },
});
