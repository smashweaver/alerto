import React from 'react';
import { MainStackNavigator } from '../navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from '../navigation/TabNavigator';

export default function Main() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  )
}
