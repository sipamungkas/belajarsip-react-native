import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DashboardStudent from '../screens/Dashboard/Student';
import DashboardInstructor from '../screens/Dashboard/Instructor';
import Notification from '../screens/Notification';
import {useSelector, shallowEqual} from 'react-redux';

const Stack = createStackNavigator();

export default function DashboardNavigators() {
  const authReducer = useSelector(state => state.authReducer, shallowEqual);
  const {role_id: roleId} = authReducer.user;
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        animationEnabled: true,
      }}>
      <Stack.Screen
        name="Dashboard"
        component={roleId === 1 ? DashboardInstructor : DashboardStudent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
