
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Schedule from '../screens/Schedule';
import Settings from '../screens/Settings';
import Subsection from '../screens/Subsection';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#9775fa",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="Subsection" component={Subsection} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator };
