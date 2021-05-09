import 'react-native-gesture-handler';
import * as React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import DashboardStudent from './src/screens/Dashboard/Student';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
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
      <Tab.Screen name="Activity" component={DashboardStudent} />
      <Tab.Screen name="Chat" component={DashboardStudent} />
      <Tab.Screen name="Profile" component={DashboardStudent} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Home" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
