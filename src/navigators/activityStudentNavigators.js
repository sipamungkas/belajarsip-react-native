import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Activity from '../screens/Activity';
import ActivityMyClass from '../screens/MyClass';
import Color from '../Color';

const Stack = createStackNavigator();

export default function ActivityNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ActivityHome"
      screenOptions={{
        headerStyle: {
          backgroundColor: Color.PRIMARY,
          height: 75,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 25,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        animationEnabled: true,
      }}>
      <Stack.Screen
        name="ActivityHome"
        component={Activity}
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
    </Stack.Navigator>
  );
}
