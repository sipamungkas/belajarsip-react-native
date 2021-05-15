import 'react-native-gesture-handler';
import * as React from 'react';

import {Provider as PaperProvider} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';

import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';

import DashboardHeader from '../components/Dashboard/Header';

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

function getHeaderRight(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Dashboard';
  switch (routeName) {
    case 'Dashboard':
      return (
        <Ionicons
          name="notifications"
          color="white"
          size={20}
          style={{position: 'absolute', top: 16, right: 3}}
        />
      );

    default:
      return '';
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
                  headerRight: () => getHeaderRight(route),
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
                  headerRight: () => getHeaderRight(route),
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
