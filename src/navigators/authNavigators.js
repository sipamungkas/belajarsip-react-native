import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Login';
import Register from '../screens/Register';
import SendOTP from '../screens/SendOTP';
import OTPVerification from '../screens/OTPVerification';

const Stack = createStackNavigator();

function authNavigators() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="SendOTP" component={SendOTP} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
    </Stack.Navigator>
  );
}

export default authNavigators;
