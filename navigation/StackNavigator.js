
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Logout from '../screens/Logout';
import Login from '../screens/Login'

const Stack = createStackNavigator();

const DrawerStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#9775fa",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="Logout" component={Logout} />
    </Stack.Navigator>
  );
}

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#9775fa",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="Logout" component={Login} />
    </Stack.Navigator>
  )
}

export { AuthStackNavigator, DrawerStackNavigator };
