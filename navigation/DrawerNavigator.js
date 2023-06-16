import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContentView } from "../components";
import { createTheme } from '../themes';
import { AppContext } from '../contexts/appContext';
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();
const { Navigator, Screen } = Drawer;

export default function DrawerNavigator() {
  const { colorScheme } = useContext(AppContext)
  const Theme = createTheme(colorScheme);
  return (
    <Navigator
      drawerContent={(props) => <DrawerContentView {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitle: 'Up Time',
        headerStyle: {
          backgroundColor: Theme.HeaderBackgroundColor,
          elevation: 0,
          shadowOpacity: 0,
          borderWidth: 0,
        },
        sceneContainerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderWidth: 0,
          backgroundColor: Theme.colors.background,
        },
        drawerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderWidth: 0,
        },
        headerTintColor: Theme.HeaderTintColor,
      }}
    >
      <Screen name="Tab" component={TabNavigator} />
    </Navigator>
  );
}
