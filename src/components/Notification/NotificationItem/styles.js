import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center', marginVertical: 4},
  imageContainer: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
    flex: 5,
    color: 'white',
    marginHorizontal: 10,
  },
  time: {
    flex: 1,
    color: 'white',
    fontFamily: 'Roboto-Bold',
    fontSize: 11,
    textAlign: 'right',
  },
  image: {width: 30, height: 30},
});
