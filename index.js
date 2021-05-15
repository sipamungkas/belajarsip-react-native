import React from 'react';

import {AppRegistry} from 'react-native';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import App from './src/navigators/rootNavigators';
import {name as appName} from './app.json';
import storeWithPersistor from './src/store/store';

const AppContainer = () => (
  <Provider store={storeWithPersistor.store}>
    <PersistGate loading={null} persistor={storeWithPersistor.persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppContainer);
