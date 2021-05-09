import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {authReducer} from './auth';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authReducer'],
};

const rootReducer = combineReducers({authReducer});

export default persistReducer(persistConfig, rootReducer);
// export default rootReducer;
