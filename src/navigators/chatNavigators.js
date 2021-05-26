import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChatList from '../screens/Chats/ChatList';

const Stack = createStackNavigator();

export default function DashboardNavigators() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        animationEnabled: true,
      }}>
      <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
