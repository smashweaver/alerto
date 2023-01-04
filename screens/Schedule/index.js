import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Alert, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../contexts/Authentication';
import { getFormattedTime, getDaysOfWeek, isWeekEnd,  } from '../../utils';
import { WeekStrip } from './WeekStrip';
import { createStyle } from '../../styles';
import { TopBar } from '../../components/TopBar';
import { EventWidget } from './EventWidget';
import {
  createEvent,
  updateEvent,
  retrieveEventById,
  removeEventById,
  createScheduleFromTemplate,
  createWeekendSchedule,
  getEventsByDate
} from '../../contexts/firebase';
import { debounce } from 'lodash';
import { AddModal, EditModal } from './AddModal';

export default function Schedule() {
  const { user, date, colorScheme } = useContext(AuthContext)
  const [events, setEvents] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activityToEdit, setActivityToEdit] = useState(null);
  const styles = createStyle('schedule', colorScheme);

  const [workingDate, setWorkingDate] = useState(date);
  const { uid } = user || {};

  const days = useMemo(() => getDaysOfWeek(Date.parse(date)), [date]);

  const [, setToggle] = useState(false);
  const reRender = useMemo(() => debounce(() => setToggle(c => !c), 250), [date]);

  const findDataIndex = (data) => events.findIndex(task => task.id === data.id);

  // fyi: manual removal from list for now
  const removeByIndex = (index) => {
    const data = [...events];
    data.splice(index, 1);
    setEvents([...data]);
  };

  const removeActivity = (activity) => {
    const index = findDataIndex(activity)
    removeEventById(activity.id)
    .then(() => removeByIndex(index))
    .catch(() => {
      console.log('*** deleting activity failed!')
    });
  };

  const handleRemoveActivity = (activity) => {
    const { hour, min, title } = activity;
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
          onPress: () => removeActivity(activity),
        }
      ]
    );
  };

  const handleEditActivity = (activity) => {
    setActivityToEdit(activity)
    setIsEditing(true);
  };

  // todo: move this to firebase.js
  const calcStart = (activity, data) => {
    const hour = ('hour' in data) ? data.hour : activity.hour;
    const min = ('min' in data) ? data.min : activity.min;
    return hour * 60 + min;
  };

  // todo: move this to firebase.js
  const createUpdatePayload = (activity = {}, data = {}) => {
    const { title, hour, min, note, alert, id } = activity;
    const payload = {};
    if (title !== data.title) { payload['title'] = data.title; }
    if (hour != data.hour)    { payload['hour'] = data.hour; }
    if (min != data.min)      { payload['min'] = data.min; }
    if (note != data.note)    { payload['note'] = data.note; }
    if (alert != data.alert)  { payload['alert'] = data.alert; }

    const start = calcStart(activity, data);
    if (start !== activity.start) { payload['start'] = start; }

    return [id, payload];
  };

  const sortEvents = async () => {
    events.sort((x, y) => x.start - y.start);
    return Promise.resolve();
  };

  const submitActivityChanges = async (activity, data) => {
    closeModal();
    const [id, payload] = createUpdatePayload(activity, data);
    updateEvent(id, payload)
    .then(() => {
      // todo: notify success via toaster
      const index = findDataIndex(activity);
      events[index] = { ...activity, ...payload };
      sortEvents().then(reRender);
    })
    .catch(() => {
       // todo: notify failure via toaster
       console.log('*** updating activity failed!');
    });
  };

  const submitNewActivity = (payload = {}) => {
    closeModal();
    createEvent(uid, workingDate, {...payload})
    .then((payload) => {
      // todo: notify success via toaster
      console.log(payload);
      events.push({ ...payload });
      sortEvents().then(reRender);
    })
    .catch(() => {
      // todo: notify failure via toaster
      console.log('*** creating new activity failed!');
    });
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
    setIsAdding(false);
    setIsEditing(false);
    setActivityToEdit(null);
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
                remove={handleRemoveActivity}
                edit={handleEditActivity}
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
        <AddModal close={closeModal} ok={submitNewActivity} />}

      {isEditing &&
        <EditModal activity={activityToEdit} close={closeModal} ok={submitActivityChanges} />}

    </SafeAreaView>
  )
}
