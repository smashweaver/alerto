import React from "react";
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Schedule from '../screens/Schedule';
import Settings from '../screens/Settings';
import Subsection from '../screens/Subsection';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Octicons } from '@expo/vector-icons';

const Nav = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Nav.Navigator  initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        showLabel: false,
      }}
    >
      <Nav.Screen
        name="Subsection"
        component={Subsection}
        options={{
          tabLabel: 'Others',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="three-bars" color={color} size={size} />
          ),
        }}
      />
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
      <Nav.Screen
        name="Settings"
        component={Settings}
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
