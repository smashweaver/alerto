import React, { useContext, useMemo } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Button } from 'react-native';
// import { format } from 'date-fns';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../contexts/Authentication';
import { getDaysOfWeek } from '../../utils';
import { WeekStrip } from './WeekStrip';
import { createStyle } from '../../styles';
import { TopBar } from '../../components/TopBar';

export default function Schedule() {
  const { colorScheme, date } = useContext(AuthContext)
  const styles = createStyle('schedule', colorScheme);
  const days = getDaysOfWeek(Date.parse(date));

  const handleAdd = () => {
    console.log('*** add event');
  };

  return (
    <SafeAreaView edges={[]} style={{ flex: 1 }}>
      <TopBar date={date} />
      <WeekStrip days={days} today={date}/>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
      >

      </ScrollView>

      <TouchableOpacity
        onPress={handleAdd}
        style={styles.button}>
        <Text style={styles.buttonText}>Add Activity</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

/*

*/