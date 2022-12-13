import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../contexts/Authentication';
import { TopBar } from '../components/TopBar';
import { format } from 'date-fns';

export default function Schedule() {
  const { date } = useContext(AuthContext);
  const today = format(new Date(date), 'EEEE, PPP');

  return (
    <SafeAreaView edges={[]} style={styles.container}>
      <TopBar today={today} />
      <View style={styles.centered}>
        <Feather name='alert-triangle' style={styles.icon}/>
        <Text style={styles.text}>Schedule</Text>
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
