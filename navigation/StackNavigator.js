
import React, { useContext } from "react";
import Login from '../screens/Login'
import Register from '../screens/Register';
// import { createStackNavigator } from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createTheme } from '../themes';
import { AuthContext } from '../contexts/Authentication';

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  const { colorScheme } = useContext(AuthContext)
  const Theme = createTheme(colorScheme);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: Theme.HeaderBackgroundColor,
          borderBottomColor: Theme.colors.border,
          borderBottomWidth: 1,
        },
        headerTintColor: Theme.HeaderTintColor,
        headerShadowVisible: true,
      }}
    >
      <Stack.Screen name="Login" component={Login}
      />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  )
}

export { AuthStackNavigator };
