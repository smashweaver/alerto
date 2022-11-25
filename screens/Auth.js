import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStackNavigator } from '../navigation/StackNavigator';

export default function Auth() {
  return (
    <NavigationContainer>
      <AuthStackNavigator />
    </NavigationContainer>
  )
}
