import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DashboardStudent from '../screens/Dashboard/Student';
import Profile from '../screens/Profile';

import ActivityNavigators from './activityStudentNavigators';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'Chat') {
            iconName = focused
              ? 'chatbox-ellipses'
              : 'chatbox-ellipses-outline';
          } else if (route.name === 'Activity') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'rgba(87, 132, 186, 1)',
        inactiveTintColor: 'rgba(173, 169, 187, 1)',
      }}>
      <Tab.Screen name="Dashboard" component={DashboardStudent} />
      <Tab.Screen name="Activity" component={ActivityNavigators} />
      <Tab.Screen name="Chat" component={DashboardStudent} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
