import React, { useContext, useEffect, useState } from "react";
import TabNavigator from "./TabNavigator";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { DrawerContentView } from "../components/DrawerContentView";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContentView {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitle: 'Alerto',

        headerStyle: {
          backgroundColor: "#9775fa",
        },
        headerTintColor: "#fff",
      }}
    >
      <Drawer.Screen name="Tab" component={TabNavigator} />
    </Drawer.Navigator>
  );
}
