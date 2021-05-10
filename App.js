import 'react-native-gesture-handler';
import * as React from 'react';

import {Provider as PaperProvider} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import DashboardStudent from './src/screens/Dashboard/Student';
import DashboardHeader from './src/components/Dashboard/Header';
import Activity from './src/screens/Activity';
import ActivityMyClass from './src/screens/MyClass';

import Color from './src/Color';

const Stack = createStackNavigator();
const ActivityStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Dashboard';

  switch (routeName) {
    case 'Dashboard':
      // return 'Dashboard';
      return <DashboardHeader />;
    case 'Activity':
      return 'Activity';
    case 'Profile':
      return 'My profile';
    case 'Account':
      return 'My account';
  }
}

function getHeaderRight(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Dashboard';
  switch (routeName) {
    case 'Dashboard':
      return (
        <Ionicons
          name="notifications"
          color="white"
          size={20}
          style={{position: 'absolute', top: 16, right: 3}}
        />
      );

    default:
      return '';
  }
}

function ActivityNavigator() {
  return (
    <ActivityStack.Navigator
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
      <ActivityStack.Screen
        name="ActivityHome"
        component={Activity}
        options={{
          headerShown: false,
        }}
      />
      <ActivityStack.Screen
        name="ActivityMyClass"
        component={ActivityMyClass}
        options={{
          headerShown: false,
        }}
      />
    </ActivityStack.Navigator>
  );
}

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
      <Tab.Screen name="Activity" component={ActivityNavigator} />
      <Tab.Screen name="Chat" component={DashboardStudent} />
      <Tab.Screen name="Profile" component={DashboardStudent} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
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
            headerLeft: props => (
              <Ionicons
                style={{marginLeft: 10}}
                name="chevron-back"
                color="white"
                size={30}
                onPress={() => {
                  console.log(props);
                }}
              />
            ),
          }}>
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
          <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={({route}) => ({
              headerTitle: getHeaderTitle(route),
              headerRight: () => getHeaderRight(route),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
