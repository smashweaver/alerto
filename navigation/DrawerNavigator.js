import React from "react";
import TabNavigator from "./TabNavigator";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { signOutUser } from "../contexts/firebase";
const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  const handleLogout = async () => {
    await signOutUser();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#e5dbff' }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 20,
            // backgroundColor: '#f6f6f6',
            marginBottom: 20,
          }}
        >
          <View>
            <Text>John Doe</Text>
            <Text>example@email.com</Text>
          </View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </View>
      </DrawerContentScrollView>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          margin: 20,
          padding: 10,
          borderRadius: 4 ,
          backgroundColor: '#845ef7'
        }}>
        <Text style={{ color: '#ffff' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}
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
