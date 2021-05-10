import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  searchRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    flex: 1,
  },
  filter: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'rgba(238, 238, 238, 1)',
    flexDirection: 'row',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  filterWrapper: {
    flex: 1,
  },
  filterItem: {
    marginRight: 10,
  },
});
