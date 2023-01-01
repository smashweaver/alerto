import React, { useContext } from "react";
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Schedule from '../screens/Schedule';
import Settings from '../screens/Settings';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { createTheme } from '../themes';
import { AuthContext } from '../contexts/Authentication';

const Nav = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { colorScheme } = useContext(AuthContext)
  const Theme = createTheme(colorScheme);
  return (
    <Nav.Navigator
      initialRouteName="Schedule"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Theme.TabBackgroundColor,
        },
        // tabBarActiveTintColor: Theme.colors.primary,
      }}
      sceneContainerStyle={{
        backgroundColor: Theme.ContainerBackgroundColor,
      }}
    >
      <Nav.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Nav.Screen
        name="Schedule"
        component={Schedule}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="calendar" color={color} size={size} />
          ),
        }}
      />
    </Nav.Navigator>
  );
};

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

      <Nav.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
        }}
      />
*/

export default BottomTabNavigator;
