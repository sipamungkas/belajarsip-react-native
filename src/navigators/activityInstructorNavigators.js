import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ActivityInstructor from '../screens/ActivityInstructor';
import ActivityMyClass from '../screens/MyClass';
import MyClassDetailInstructor from '../screens/MyClassDetailInstructor';

const Stack = createStackNavigator();

export default function ActivityNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ActivityHome"
      screenOptions={{
        animationEnabled: true,
      }}>
      <Stack.Screen
        name="ActivityHome"
        component={ActivityInstructor}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ActivityMyClass"
        component={ActivityMyClass}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyClassDetail"
        component={MyClassDetailInstructor}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
