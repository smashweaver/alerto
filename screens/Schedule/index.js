import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../contexts/Authentication';
import { getDaysOfWeek, isWeekEnd } from '../../utils';
import { WeekStrip } from './WeekStrip';
import { createStyle } from '../../styles';
import { TopBar } from '../../components/TopBar';
import { createScheduleFromTemplate, createWeekendSchedule, getEventsByDate } from '../../contexts/firebase';
import { EventWidget } from './EventWidget';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function Schedule() {
  const { user, date, colorScheme } = useContext(AuthContext)
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const styles = createStyle('schedule', colorScheme);

  const [workingDate, setWorkingDate] = useState(date);
  const { uid } = user || {};

  const days = useMemo(() => getDaysOfWeek(Date.parse(date)), [date]);

  const handleChangeWorkingDate = (newWorkingDate) => {
    console.log('*** workingdate changed:', newWorkingDate);
    setWorkingDate(newWorkingDate);
  };

  const handleAdd = () => {
    console.log('*** add event');
    setIsAdding(true);
  };

  const closeModal = () => {
    console.log('*** close modal');
    setIsAdding(false);
  };

  const setupData = useCallback(() => {
    getEventsByDate(uid, workingDate)
    .then((data) => {
      console.log('*** done reading schedule...', workingDate);
      data.sort((x, y) => x.start - y.start);
      setEvents([...data]);
    });
  }, [uid, workingDate]);

  useEffect(() => {
    console.log('*** workingDate changed:', workingDate);
    setEvents([]);
    if (!isWeekEnd(workingDate)) {
      createScheduleFromTemplate(user.uid, workingDate)
      .then(setupData)
    } else {
      createWeekendSchedule(workingDate)
      .then(data => setEvents([...data]));
    }
  }, [workingDate]);

  return (
    <SafeAreaView edges={[]} style={{ flex: 1 }}>
      <TopBar date={workingDate} />
      <WeekStrip days={days} today={date} workingDate={workingDate} setWorkingDate={handleChangeWorkingDate} />
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

      {isAdding &&
        <EventFormModal close={closeModal} />}
    </SafeAreaView>
  )
}

const EventForm = () => {
  const insets = useSafeAreaInsets();
  console.log({insets});
  return (
    <View style={{
        backgroundColor: '#FFF',
        marginTop: insets.top,
        flex: 1,
      }}
    >
      <Text>New Activity</Text>
    </View>
  );
};

const EventFormModal = ({ close }) => {
  return (
    <Modal
      visible={true}
      transparent={true}
      onRequestClose={close}
      style={{ margin: 0}}
    >
      <EventForm />
    </Modal>
  );
};
