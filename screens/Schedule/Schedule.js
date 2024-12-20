import { useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Alert, View, StyleSheet, Text } from 'react-native';
import { AppContext } from '../../contexts/appContext';
import { getFormattedTime, getDaysOfWeek, isWeekEnd,  } from '../../utils';
import { WeekStrip } from '../../components';
import { createStyle } from '../../styles';
import { DateBar } from '../../components';
import { debounce } from 'lodash';
import { AddModal } from './AddModal';
import { EditModal } from './EditModal';
import { Toolbar } from './Toolbar';
import { Activities } from '../../components';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { createTheme } from '../../themes';
import { calcStart, canOccure } from '../../utils';
import { ActivityModal } from '../../components';

const Theme = createTheme();

export default function Schedule() {
  const {
    user,
    profile,
    date,
    colorScheme,
    features,
    api: {
      getEventsByDate,
      addDatedEvent,
      removeDatedEvent,
      updateDatedEvent,
    },
  } = useContext(AppContext)
  const [events, setEvents] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activityToEdit, setActivityToEdit] = useState(null);
  const [workingDate, setWorkingDate] = useState(date);
  const [isProcessing, setProcessing] = useState(false);
  const [, setToggle] = useState(false);

  // console.log('*** Schedule', { workingDate, date });

  const reRender = useMemo(() => debounce(() => setToggle(c => !c), 250), [date]);
  const days = useMemo(() => getDaysOfWeek(Date.parse(date)), [date]);

  const { uid } = user || {};
  const isEditable = false; // date <= workingDate;
  const isNewEnabled = date <= workingDate;
  const isEmpty = !events.length;

  const findDataIndex = (data) => events.findIndex(task => task.id === data.id);

  // todo: use streaming
  const removeByIndex = (index) => {
    const data = [...events];
    data.splice(index, 1);
    setEvents([...data]);
  };

  const removeActivity = (activity) => {
    const index = findDataIndex(activity)
    setIsEditing(false);
    setProcessing(true);
    removeDatedEvent(uid, activity.id, workingDate)
    .then(() => setupData(workingDate))
    .catch(() => {
      console.log('*** deleting activity failed!')
    })
    .finally(() => setProcessing(false));
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
    const { title, hour, min, note, alert, id, duration, occurence, disable, is_done } = activity;
    const payload = {};
    if (title !== data.title) { payload['title'] = data.title; }
    if (hour != data.hour)    { payload['hour'] = data.hour; }
    if (min != data.min)      { payload['min'] = data.min; }
    if (note != data.note)    { payload['note'] = data.note; }
    if (alert != data.alert)  { payload['alert'] = data.alert; }
    if (duration != data.duration)    { payload['duration'] = data.duration }
    if (disable != data.disable)      { payload['disable'] = data.disable }
    if (occurence != data.occurence)  { payload['occurence'] = data.occurence || false }
    //if (is_done != data.is_done)      { payload['is_done'] = data.is_done || false }

    const start = calcStart(activity, data);
    if (start !== activity.start) { payload['start'] = start; }

    return [id, payload];
  };

  const submitActivityChanges = async (activity, data) => {
    closeModal();
    const [id, payload] = createUpdatePayload(activity, data);
    console.log('*** updating:', { activity, id, payload });
    setProcessing(true);
    updateDatedEvent(uid, id, date, payload)
    .then(() => {
      setupData(workingDate);
    })
    .catch(() => {
       // todo: notify failure via toaster
       console.log('*** updating activity failed!');
    })
    .finally(() => setProcessing(false));
  };

  const submitNewActivity = (payload = {}) => {
    closeModal();
    setProcessing(true);

    const {
      title,
      hour,
      min,
      duration,
      note,
      alert,
      custom,
      disable,
    } = payload;

    addDatedEvent(uid, workingDate, {
      title,
      hour,
      min,
      duration,
      note,
      alert,
      custom,
      disable,
      occurence: false,
    })
    .then(() => {
      // todo: notify success via toaster
      // events.push({ ...data });
      // sortEvents().then(reRender);
      setupData(workingDate);
    })
    .catch((error) => {
      // todo: notify failure via toaster
      console.log('*** creating new activity failed:', error.message);
    })
    .finally(() => setProcessing(false));
  };

  const handleChangeWorkingDate = (newWorkingDate) => {
    console.log('*** workingDate changed:', newWorkingDate);
    setWorkingDate(newWorkingDate);
  };

  const handleNewActivity = () => {
    console.log('*** new activity');
    setActivityToEdit(null);
    setIsAdding(true);
  };

  const closeModal = () => {
    setIsAdding(false);
    setIsEditing(false);
    setActivityToEdit(null);
  };

  const setupData = (targetDate) => {
    console.log('*** setupData', { date, workingDate, targetDate })
    setProcessing(true);
    setEvents([]);
    getEventsByDate(uid, targetDate)
    .then(data => {
      data.sort((x, y) => x.start - y.start);
      setEvents([...data]);
      setProcessing(false);
    });
  };

  useEffect(() => {
    // console.log('*** profile:',  JSON.stringify(profile, null, 2));
    console.log('*** Schedule HOOK: ', { date, workingDate })
    setupData(workingDate);
  }, [workingDate, profile]);

  useFocusEffect(
    useCallback(() => {
      console.log('*** screen changed: Schedule', { date, workingDate });
      //setWorkingDate(workingDate);
      reRender();
      if (!isProcessing) setupData(workingDate);
    }, [workingDate])
  );

  return (
    <View style={{flex:1}}>
      <View style={styles.container}>
        <Toolbar />
        <DateBar date={workingDate} />
        <WeekStrip days={days} today={date} workingDate={workingDate} setWorkingDate={handleChangeWorkingDate} />
        <EmptyView hidden={!isProcessing ? !isEmpty : true} />

        <Activities
          isEditable={isEditable}
          events={events}
          onDelete={handleRemoveActivity}
          onEdit={handleEditActivity}
        />

        <View visible={false}>
          <Button disabled={!isNewEnabled} textColor={Theme.colors.primary} onPress={handleNewActivity}>
            New Activity
          </Button>
        </View>
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

      <ActivityModal visible={isProcessing} />
    </View>
  )
}

function EmptyView({ hidden=true }) {
  const myStyle = hidden ? [styles.hidden] : [styles.flex, styles.shown];
  return (
    <View style={myStyle}>
      <View style={{padding: 24, borderWidth:1, borderColor:Theme.colors.primary, borderRadius:4}}>
        <Text style={{color:Theme.colors.text}}>
          No activities found for the day
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    height: '100%',
  },
  shown:{
    flexGrow: 8,
  },
  hidden: {
    display: 'none',
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
