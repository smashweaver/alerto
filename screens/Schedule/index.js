import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../contexts/Authentication';
import { getDaysOfWeek } from '../../utils';
import { WeekStrip } from './WeekStrip';
import { createStyle } from '../../styles';
import { TopBar } from '../../components/TopBar';
import { createScheduleFromTemplate, getEventsByDate } from '../../contexts/firebase';
import { EventWidget } from './EventWidget';

export default function Schedule() {
  const { user, date, colorScheme } = useContext(AuthContext)
  const [events, setEvents] = useState([]);
  const styles = createStyle('schedule', colorScheme);

  const [workingDate, setWorkingDate] = useState(date);
  const { uid } = user || {};

  const days = useMemo(() => getDaysOfWeek(Date.parse(date)), [workingDate]);

  const handleAdd = () => {
    console.log('*** add event');
  };

  const setupData = useCallback(() => {
    getEventsByDate(uid, workingDate)
    .then((data) => {
      console.log('*** done reading schedule...', { data });
      data.sort((x, y) => x.start - y.start);
      setEvents([...data]);
    });
  }, [uid, workingDate]);

  useEffect(() => {
    createScheduleFromTemplate(user.uid, workingDate)
    .then(setupData)
  }, [workingDate]);

  return (
    <SafeAreaView edges={[]} style={{ flex: 1 }}>
      <TopBar date={date} />
      <WeekStrip days={days} today={date}/>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={{ marginTop: 10 }}>
          {
            events.map(ev => <EventWidget task={ev} key={ev.id} />)
          }
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={handleAdd}
        style={styles.button}>
        <Text style={styles.buttonText}>New Activity</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
