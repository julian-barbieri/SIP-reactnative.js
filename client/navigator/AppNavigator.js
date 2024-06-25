// AppNavigator.js

// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen.js';
import RegisterScreen from '../screens/RegisterScreen.js';
import HomeSuperScreen from '../screens/HomeSuperScreen.js';
import WelcomeScreen from '../screens/WelcomeScreen.js';
import MapaScreen from '../screens/MapaScreen.js';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="HomeSuper" component={HomeSuperScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Mapa" component={MapaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;


