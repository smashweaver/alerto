import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStackNavigator } from '../navigation/StackNavigator';
import { createTheme } from '../themes';

export default function Auth() {
  const Theme = createTheme();
  console.log(Theme.colors);
  return (
    <NavigationContainer>
      <AuthStackNavigator />
    </NavigationContainer>
  )
}
