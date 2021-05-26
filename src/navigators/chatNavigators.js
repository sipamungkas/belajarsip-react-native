import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChatList from '../screens/Chats/ChatList';
import NewChat from '../screens/Chats/NewChat';
import NewChatGroup from '../screens/Chats/NewChatGroup';
import CreateGroup from '../screens/Chats/CreateGroup';

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
      <Stack.Screen
        name="NewChat"
        component={NewChat}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewChatGroup"
        component={NewChatGroup}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateGroup"
        component={CreateGroup}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
