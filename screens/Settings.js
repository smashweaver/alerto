import React, { useContext, useMemo } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../contexts/Authentication';
import { TopBar } from '../components/TopBar';

export default function Settings() {
  const { date } = useContext(AuthContext);

  return (
    <SafeAreaView edges={[]} style={styles.container}>
      <TopBar date={date} />
      <View style={styles.centered}>
        <Feather name='alert-triangle' style={styles.icon}/>
        <Text style={styles.text}>Settings</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5dbff',
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
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
