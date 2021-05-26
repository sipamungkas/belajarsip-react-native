import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  description: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 20,
  },
  textInput: {
    fontFamily: 'Roboto-Medium',
    fontSize: 24,
  },
  instruction: {
    color: 'rgba(120, 120, 120, 1)',
    marginTop: 10,
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
  },
  participantCard: {
    marginTop: 8,
  },
  title: {
    fontFamily: 'Kanit-Medium',
    fontSize: 16,
  },
  participantContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    alignItems: 'center',
    margin: 10,
    width: 60,
  },
  name: {
    marginTop: 5,
    textAlign: 'center',
  },
});
