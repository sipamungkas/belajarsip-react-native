import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore} from 'redux-persist';

import ReduxThunk from 'redux-thunk';

import rootReducer from './reducers/root';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// development mode
let enhancers = composeEnhancers(applyMiddleware(ReduxThunk));

if (process.env.NODE_ENV !== 'development') {
  enhancers = applyMiddleware(ReduxThunk);
}

const store = createStore(rootReducer, enhancers);

// export default store;

const persistor = persistStore(store);

const storeWithPersistor = {store, persistor};

export default storeWithPersistor;
