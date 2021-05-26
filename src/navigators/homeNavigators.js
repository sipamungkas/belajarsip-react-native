import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, shallowEqual} from 'react-redux';

import Profile from '../screens/Profile';

import ActivityStudentNavigators from './activityStudentNavigators';
import ActivityInstructorNavigators from './activityInstructorNavigators';
import DashboardNavigators from './dashboardNavigators';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const authReducer = useSelector(state => state.authReducer, shallowEqual);
  const {role_id: roleId} = authReducer.user;
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
      <Tab.Screen name="Dashboard" component={DashboardNavigators} />
      <Tab.Screen
        name="Activity"
        component={
          roleId === 1
            ? ActivityInstructorNavigators
            : ActivityStudentNavigators
        }
      />
      <Tab.Screen name="Chat" component={DashboardNavigators} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
