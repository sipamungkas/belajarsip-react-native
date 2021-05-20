import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ActivityInstructor from '../screens/ActivityInstructor';
import ActivityMyClass from '../screens/MyClass';
import MyClassDetail from '../screens/MyClassDetail';

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
        component={MyClassDetail}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
