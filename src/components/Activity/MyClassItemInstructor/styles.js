import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const data = StyleSheet.create({
  card: {marginVertical: 2},
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
  titleContainer: {flex: 4},
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  studentContainer: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  studentCount: {
    marginRight: 5,
  },
});

export default data;
