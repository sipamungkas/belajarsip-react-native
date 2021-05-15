import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Login';
import Register from '../screens/Register';
import SendOTP from '../screens/SendOTP';

const Stack = createStackNavigator();

function authNavigators() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="SendOTP" component={SendOTP} />
    </Stack.Navigator>
  );
}

export default authNavigators;
