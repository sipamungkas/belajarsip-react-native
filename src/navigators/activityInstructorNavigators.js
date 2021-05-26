import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ActivityInstructor from '../screens/ActivityInstructor';
import ActivityMyClassInstructor from '../screens/MyClassInstructor';
import MyClassDetailInstructor from '../screens/MyClassDetailInstructor';
import Score from '../screens/Score';

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
        component={ActivityMyClassInstructor}
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
      <Stack.Screen
        name="Score"
        component={Score}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
