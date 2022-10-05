
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Logout from '../screens/Logout';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
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

export { MainStackNavigator };
