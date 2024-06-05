import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login'
import LocationScreen from './src/screens/LocationScreen';
import Driver from './src/screens/Driver';
import Time from './src/screens/Time';      

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Location' component={LocationScreen} />
        <Stack.Screen name='Driver' component={Driver} />
        <Stack.Screen name='Time' component={Time} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;