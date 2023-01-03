import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Alert, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../contexts/Authentication';
import { getFormattedTime, getDaysOfWeek, isWeekEnd,  } from '../../utils';
import { WeekStrip } from './WeekStrip';
import { createStyle } from '../../styles';
import { TopBar } from '../../components/TopBar';
import { removeEventById, createScheduleFromTemplate, createWeekendSchedule, getEventsByDate } from '../../contexts/firebase';
import { EventWidget } from './EventWidget';
import { useNavigation } from '@react-navigation/native';

import { AddModal } from './AddModal';

export default function Schedule() {
  const { user, date, colorScheme } = useContext(AuthContext)
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const styles = createStyle('schedule', colorScheme);

  const [workingDate, setWorkingDate] = useState(date);
  const { uid } = user || {};

  const days = useMemo(() => getDaysOfWeek(Date.parse(date)), [date]);

  const removeByIndex = (index) => {
    const data = [...events];
    data.splice(index, 1);
    setEvents([...data]);
  };

  const remove = (activity) => {
    const index = events.indexOf(activity);
    console.log(activity);
    const { hour, min, title, id } = activity;
    const start = getFormattedTime(hour, min);
    const detail = `${title} at ${start}`;
    Alert.alert(
      'Delete this activity?',
      detail,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            console.log(`Deleting ${detail}`);
            removeEventById(activity.id)
            .then(() => removeByIndex(index))
            .catch(() => console.log('*** error!!!'))
          },
        }
      ]
    );
  };

  const edit = (target) => {
    console.log('*** edit:', target.id)
  };

  const submitNew = (data = {}) => {
    console.log('*** new:', data);
    setIsAdding(false);
  };

  const handleChangeWorkingDate = (newWorkingDate) => {
    console.log('*** workingdate changed:', newWorkingDate);
    setWorkingDate(newWorkingDate);
  };

  const handleNewActivity = () => {
    console.log('*** new activity');
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
            events.map((activity, index) =>
              <EventWidget
                task={activity}
                remove={remove}
                edit={edit}
                key={index} />
            )
          }
        </View>
      </ScrollView>

      <View style={{ padding: 10 }}>
        <TouchableOpacity
          onPress={handleNewActivity}
          style={styles.button}>
          <Text style={styles.buttonText}>New Activity</Text>
        </TouchableOpacity>
      </View>


      {isAdding &&
        <AddModal close={closeModal} ok={submitNew} />}
    </SafeAreaView>
  )
}

/*

*/