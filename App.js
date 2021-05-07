import 'react-native-gesture-handler';
import * as React from 'react';

import {Root} from 'native-base';

import {createStackNavigator} from '@react-navigation/stack';

import Login from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

function App() {
  return (
    <Root>
      <NavigationContainer>
        <Stack.Navigator headerMode={'none'}>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  );
}

export default App;
