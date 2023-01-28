import React, { useContext, useMemo } from "react";
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Schedule from '../screens/Schedule';
// import Settings from '../screens/Settings';
import { SettingStackNavigator } from './StackNavigator';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { createTheme } from '../themes';
import { AppContext } from '../contexts/appContext';
import { Pressable } from "react-native";

const Nav = createBottomTabNavigator();

const DisabledTabBarButton = ({ style, ...props }) => (
  <Pressable disabled style={[{ opacity: 0.3 }, style]} {...props} />
);

const EnabledTabBarButton = ({ style, ...props }) => (
  <Pressable style={[style]} {...props} />
);

const BottomTabNavigator = () => {
  const { profile, colorScheme } = useContext(AppContext)

  const isSurveyRequired = useMemo(() => {
    return !profile.survey;
  }, [profile.survey])

  const isScheduleRequired = useMemo(() => {
    return !profile.schedule;
  }, [profile.schedule])

  const defaultRouteName = isSurveyRequired || isScheduleRequired ? 'Settings' : 'Home';
  const Theme = createTheme(colorScheme);
  return (
    <Nav.Navigator
      initialRouteName={defaultRouteName}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Theme.colors.background,
          borderWidth: 0,
        },
        // tabBarActiveTintColor: Theme.colors.primary,
      }}
      sceneContainerStyle={{
        backgroundColor: Theme.colors.background,
        borderWidth: 0,
      }}
    >
      <Nav.Screen
        name="Schedule"
        component={Schedule}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="calendar" color={color} size={size} />
          ),
          tabBarButton: isSurveyRequired || isScheduleRequired ? DisabledTabBarButton : EnabledTabBarButton,
        }}
      />

      <Nav.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
          tabBarButton: isSurveyRequired || isScheduleRequired ? DisabledTabBarButton : EnabledTabBarButton,
        }}
      />

      <Nav.Screen
        name="Settings"
        component={SettingStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
        }}
      />

    </Nav.Navigator>
  );
};

export default BottomTabNavigator;

/*
  <Nav.Screen
    name="Profile"
    component={Profile}
    options={{
      tabBarIcon: ({ color, size }) => (
        <MaterialIcons name="person" color={color} size={size} />
      ),
    }}
  />
*/
