/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Calculator from './screens/Calculator'
import Home from './screens/Home'

const Tab = createMaterialTopTabNavigator();

const App: () => React$Node = () => {
    return(
      <NavigationContainer>
        <Tab.Navigator 
          tabBarOptions={{
          activeTintColor: '#3Caf71',
          inactiveTintColor: 'gray',
        }}>
          <Tab.Screen name="Precios" component={Home}/>
          <Tab.Screen name="Calculadora" component={Calculator}/>
        </Tab.Navigator>
      </NavigationContainer>
    )
}

export default App;
