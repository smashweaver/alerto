import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Alert, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { AppContext } from '../../contexts/appContext';
import { getFormattedTime, getDaysOfWeek, isWeekEnd,  } from '../../utils';
import { WeekStrip } from '../../components/WeekStrip/WeekStrip';
import { createStyle } from '../../styles';
import { TopBar } from '../../components/TopBar';
//import { EventWidget } from '../../components/Activities/EventWidget';
import { debounce } from 'lodash';
import { AddModal } from './AddModal';
import { EditModal } from './EditModal';
import { Activities } from '../../components/Activities';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { createTheme } from '../../themes';
import { calcStart } from '../../utils';

const Theme = createTheme();

export default function Schedule() {
  const { user, profile, date, colorScheme, api } = useContext(AppContext)
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
    setIsEditing(false);

    api.removeEventById(activity.id)
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
    api.updateEvent(id, payload)
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
    const {
      title,
      hour,
      min,
      duration,
      note,
      alert,
      custom
    } = payload;

    api.createEvent(uid, workingDate, {
      title,
      hour,
      min,
      duration,
      note,
      alert,
      custom,
    })
    .then((data) => {
      // todo: notify success via toaster
      events.push({ ...data });
      sortEvents().then(reRender);
    })
    .catch((error) => {
      // todo: notify failure via toaster
      console.log('*** creating new activity failed:', error.message);
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
    api.getEventsByDate(uid, workingDate)
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
      api.createScheduleFromTemplate(profile, user.uid, workingDate)
      .then(setupData)
    } else {
      api.createWeekendSchedule(workingDate)
      .then(data => setEvents([...data]));
    }
  }, [workingDate]);

  useFocusEffect(() => {
    console.log('*** screen changed: Schedule');
  });

  return (
    <View edges={[]} style={{ flex: 1 }}>
      <TopBar date={workingDate} />
      <WeekStrip days={days} today={date} workingDate={workingDate} setWorkingDate={handleChangeWorkingDate} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={{ marginTop: 10 }}>
          <Activities
            events={events}
            onDelete={handleRemoveActivity}
            onEdit={handleEditActivity}
          />
        </View>
      </ScrollView>

      <View style={{ margin: 10 }}>
        <Button mode='text' textColor={Theme.colors.primary} onPress={handleNewActivity}>
          New Activity
        </Button>
      </View>

      <AddModal
        visible={isAdding}
        workingDate={workingDate}
        close={closeModal}
        ok={submitNewActivity}
      />

      <EditModal
        visible={isEditing}
        activity={activityToEdit}
        close={closeModal}
        ok={submitActivityChanges}
        onDelete={handleRemoveActivity}
      />
    </View>
  )
}
