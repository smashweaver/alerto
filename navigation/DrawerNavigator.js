import React, { useContext, useEffect, useState } from "react";
import TabNavigator from "./TabNavigator";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { DrawerContentView } from "../components/DrawerContentView";
import { createTheme } from '../themes';
import { AuthContext } from '../contexts/Authentication';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { colorScheme } = useContext(AuthContext)
  const Theme = createTheme(colorScheme);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContentView {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitle: 'Alerto',
        headerStyle: {
          backgroundColor: Theme.HeaderBackgroundColor,
          elevation: 0,
          shadowOpacity: 0,
          borderWidth: 0,
        },
        drawerStyle: {},
        headerTintColor: Theme.HeaderTintColor,
      }}
    >
      <Drawer.Screen name="Tab" component={TabNavigator} />
    </Drawer.Navigator>
  );
}
