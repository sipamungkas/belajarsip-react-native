import 'react-native-gesture-handler';
import * as React from 'react';

import {Provider as PaperProvider} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';

import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

import {connect} from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';

const Stack = createStackNavigator();

// Navigators
import AuthNavigators from './authNavigators';
import HomeNavigators from './homeNavigators';

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Dashboard';

  switch (routeName) {
    case 'Dashboard':
      // return 'Dashboard';
      return 'Dashboard';
    case 'Activity':
      return 'Activity';
    case 'Profile':
      return 'My profile';
    case 'Account':
      return 'My account';
  }
}

function App(props) {
  const {isLoggedIn} = props.authReducer;
  return (
    <PaperProvider>
      <NavigationContainer onReady={() => RNBootSplash.hide()}>
        <Stack.Navigator headerMode="none">
          {isLoggedIn ? (
            <>
              <Stack.Screen
                name="Home"
                component={HomeNavigators}
                options={({route}) => ({
                  headerTitle: getHeaderTitle(route),
                })}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Auth"
                component={AuthNavigators}
                options={({route}) => ({
                  headerTitle: getHeaderTitle(route),
                })}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
  };
};

const ConnectedLogin = connect(mapStateToProps)(App);

export default ConnectedLogin;
