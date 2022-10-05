import React from 'react';
import { MainStackNavigator } from '../navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function Main() {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  )
}
