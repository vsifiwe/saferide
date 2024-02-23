import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login'
import RequestDriver from './src/screens/RequestDriver';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Driver' component={RequestDriver} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;