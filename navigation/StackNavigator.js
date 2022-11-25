
import React from "react";
import Logout from '../screens/Logout';
import Login from '../screens/Login'
import Register from '../screens/Register';
import { createStackNavigator } from "@react-navigation/stack";

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
        headerShown: true,
        headerStyle: {
          backgroundColor: "#9775fa",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  )
}

export { AuthStackNavigator, DrawerStackNavigator };
