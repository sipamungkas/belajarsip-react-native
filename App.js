import 'react-native-gesture-handler';
import * as React from 'react';

import {Provider as PaperProvider} from 'react-native-paper';

import {createStackNavigator} from '@react-navigation/stack';

import Login from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator headerMode={'none'}>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
