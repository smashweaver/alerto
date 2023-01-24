import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStackNavigator } from '../navigation/StackNavigator';
import { createTheme } from '../themes';

export default function Auth() {
  const theme = createTheme();
  return (
    <NavigationContainer theme={theme}>
      <AuthStackNavigator />
    </NavigationContainer>
  )
}
