import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {authReducer} from './auth';
import {forgotReducer} from './forgot';
import {snackbarReducer} from './snackbar';
import {loadingReducer} from './loading';
import {notificationReducer} from './notification';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authReducer'],
};

const rootReducer = combineReducers({
  authReducer,
  forgotReducer,
  snackbarReducer,
  loadingReducer,
  notificationReducer,
});

export default persistReducer(persistConfig, rootReducer);
// export default rootReducer;
