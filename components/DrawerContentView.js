import React, { useContext, useEffect, useState } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { signOutUser } from '../contexts/firebase';
import { AuthContext } from '../contexts/Authentication';
import { createStyle } from '../styles';

const DrawerContentView = (props) => {
  const [userName, setName] = useState('Unknown');
  const { user } = useContext(AuthContext);
  const { colorScheme } = useContext(AuthContext)
  const styles = createStyle('drawerContent', colorScheme);

  const handleLogout = async () => {
    await signOutUser();
  };

  useEffect(() => {
    const { displayName } = user || {};
    setName(displayName || 'Unknown');
  }, [user]);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View
          style={styles.scroll}
        >
          <View>
            <Text style={styles.text}>{userName}</Text>
            <Text style={styles.text}>{user && user.email}</Text>
          </View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            }}
            style={styles.image}
          />
        </View>
      </DrawerContentScrollView>

      <TouchableOpacity
        onPress={handleLogout}
        style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export { DrawerContentView };
