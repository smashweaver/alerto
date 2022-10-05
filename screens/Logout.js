import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import { auth, signOut } from '../contexts/firebase';
import { AuthContext } from '../contexts/Authentication';

export default function Logout() {
  const { setUser } = useContext(AuthContext);
  const handleLogout = () => {
    signOut(auth).catch((error) => {
      console.log(err.message);
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.text}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: '10%',
    backgroundColor: '#e5dbff',
  },
  button: {
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: '#845ef7',
    borderRadius: 4
  },
  text: {
    color: '#fff',
  }
});