import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <Feather name='alert-triangle' style={styles.icon}/>
      <Text style={styles.text}>Profile</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    paddingHorizontal: '10%',
    backgroundColor: '#e5dbff',
  },
  text: {
    color: '#5f3dc4',
    fontSize: 32,
    fontWeight: '600',
    marginTop: 10,
  },
  icon: {
    color: '#5f3dc4',
    fontSize: 96,
    fontWeight: '600',
  }
});
