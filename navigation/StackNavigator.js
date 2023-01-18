
import React, { useContext } from "react";
import Login from '../screens/Login'
import Register from '../screens/Register';
import Setting, { ManageActivities, ManageSchedule } from '../screens/Settings';
import { createStackNavigator } from '@react-navigation/stack';
//import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createTheme } from '../themes';
import { AppContext } from '../contexts/appContext';

const AuthNav= createStackNavigator();

const AuthStackNavigator = () => {
  const { colorScheme } = useContext(AppContext)
  const Theme = createTheme(colorScheme);
  return (
    <AuthNav.Navigator
      theme={Theme}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: Theme.HeaderBackgroundColor,
          borderBottomColor: Theme.colors.border,
          borderBottomWidth: 1,
        },
        cardStyle: {
          backgroundColor: Theme.HeaderBackgroundColor,
          borderBottomColor: Theme.colors.border,
          borderBottomWidth: 1,
        },
        headerTintColor: Theme.HeaderTintColor,
        headerShadowVisible: true,
      }}
      sceneContainerStyle={{
        backgroundColor: Theme.ContainerBackgroundColor,
      }}
    >
      <AuthNav.Screen name="Login" component={Login} />
      <AuthNav.Screen name="Register" component={Register} />
    </AuthNav.Navigator>
  )
};

const SettingNav = createStackNavigator();

const SettingStackNavigator = () => {
  const { colorScheme } = useContext(AppContext)
  const Theme = createTheme(colorScheme);
  return (
    <SettingNav.Navigator
    theme={Theme}
    screenOptions={{
      headerShown: false,
      headerStyle: {
        backgroundColor: Theme.HeaderBackgroundColor,
        borderBottomColor: Theme.colors.border,
        borderBottomWidth: 1,
      },
      cardStyle: {
        backgroundColor: Theme.HeaderBackgroundColor,
        borderBottomColor: Theme.colors.border,
        borderBottomWidth: 1,
      },
      headerTintColor: Theme.HeaderTintColor,
      headerShadowVisible: true,
    }}
    sceneContainerStyle={{
      backgroundColor: Theme.ContainerBackgroundColor,
    }}
    >
      <SettingNav.Screen name='SettingIndex' component={Setting} />
      <SettingNav.Screen name='SettingActivities' component={ManageActivities} />
      <SettingNav.Screen name='SettingSchedule' component={ManageSchedule} />

    </SettingNav.Navigator>
  )
};

export { AuthStackNavigator, SettingStackNavigator };
