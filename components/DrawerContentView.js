import React, { useContext, useEffect, useState } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../contexts/appContext';
import { createStyle } from '../styles';
import { createTheme } from '../themes';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';

export function DrawerContentView (props) {
  const { colorScheme, user, auth } = useContext(AppContext);
  const { navigation } = props;
  const [userName, setName] = useState('Unknown');
  const styles = createStyle('drawerContent', colorScheme);
  const Theme = createTheme(colorScheme);

  const handleLogout = () => {
    auth.signOutUser();
  };

  useEffect(() => {
    const { displayName } = user || {};
    setName(displayName || 'Unknown');
  }, [user]);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View
          style={[styles.scroll, { marginBottom: 30 }]}
        >
          <View>
            <Text style={styles.text}>{userName}</Text>
            <Text style={styles.text}>{user && user.email}</Text>
          </View>

          <Avatar.Text size={48} label="XD" />
        </View>
      </DrawerContentScrollView>

      <TouchableOpacity
          onPress={handleLogout}
          style={styles.button}>
          <Text style={[styles.buttonText, {fontSize:16, fontWeight: '400'}]}>Logout</Text>
      </TouchableOpacity>

      <View style={{flexGrow:1, maxHeight: Platform.OS === 'ios' ? 45 : 10}}/>
    </View>
  );
}


/*
  <Image
    source={{
      uri: 'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    }}
    style={styles.image}
  />

  const handleRetake = () => {
    navigation.toggleDrawer();
    navigation.navigate({ name: 'SurveyIndex', params: { retake: true }});
  };

  const handlePomodoro = () => {
    navigation.toggleDrawer();
  };

  <TouchableOpacity
    onPress={handlePomodoro}
    style={styles.linkContainer}
  >
    <MaterialIcons name="healing" size={24} color={Theme.LinkColor} />
    <Text style={styles.linkText}>Self-Care</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={handlePomodoro}
    style={styles.linkContainer}
  >
    <MaterialCommunityIcons name="meditation" size={24} color={Theme.LinkColor} />
    <Text style={styles.linkText}>Meditation</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={handlePomodoro}
    style={styles.linkContainer}
  >
    <MaterialCommunityIcons name="run" size={24} color={Theme.LinkColor} />
    <Text style={styles.linkText}>Exercise</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={handlePomodoro}
    style={styles.linkContainer}
  >
    <MaterialIcons name="timer" size={24} color={Theme.LinkColor} />
    <Text style={styles.linkText}>Pomodoro Timer</Text>
  </TouchableOpacity>

*/