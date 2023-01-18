import { useContext, useEffect, useState } from 'react';
import { Alert,  View } from 'react-native';
import { AppContext } from '../../contexts/appContext';
import { createTheme } from '../../themes';
import { ActivitiesModal } from './ActivitiesModal';
import { EditModal } from './EditModal';
import { AddModal } from './AddModal';
import { getFormattedTime } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { calcStart } from '../../utils';

const Theme = createTheme();

export default function ManageActivities() {
  const navigation = useNavigation();

  const {
    user,
    profile,
    api: {
      updateProfileEvents,
      refreshProfile
    }
  } = useContext(AppContext);

  const [events, setEvents] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activityToEdit, setActivityToEdit] = useState(null);

  const submitActivityChanges = async (activity, data) => {
    const index = events.findIndex(x => x === activity);
    console.log('*** profile event changed', { index });
    const newEvents = [...events];
    newEvents[index] = { ...data };
    updateProfileEvents(user.uid, { events: [...newEvents]});
    refreshProfile(user.uid);
    closeActivityModal();
  };

  const submitNewActivity = async(activity) => {
    const newEvents = [...events, { ...activity }];
    updateProfileEvents(user.uid, { events: [...newEvents]});
    refreshProfile(user.uid);
    closeActivityModal();
  };

  const removeActivity = (activity) => {
    const newEvents = events.filter(x => x !== activity);
    updateProfileEvents(user.uid, { events: [...newEvents]});
    refreshProfile(user.uid);
    closeActivityModal();
  };

  const removeDeletedActivity = (activity) => {
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

  const goBack = () => {
    navigation.navigate('SettingIndex');
  }

  const editActivity = (activity) => {
    setActivityToEdit(activity);
    setIsEditing(true);
  };

  const addActivity = () => {
    setActivityToEdit(null);
    setIsAdding(true);
  };

  const closeActivityModal = () => {
    setIsAdding(false);
    setIsEditing(false);
    setActivityToEdit(null);
  };

  const updateProfileSchedule = () => {
    console.log('*** updating profile schedule');
  };

  useEffect(() => {
    console.log('*** mounting ManageActivities');
    // setTimeout(() => setEvents([...profile.events]), 500);
    return () => console.log('*** unmounting ManageActivities');
  }, []);

  useEffect(() => {
    console.log('*** refreshing profile events');
    const tasks = [...profile.events];
    tasks.sort((x, y) => {
      const xs = calcStart(x);
      const ys = calcStart(y);
      return xs - ys;
    });
    setTimeout(() => setEvents([...tasks]), 500);
  }, [profile.events])

  return (
    <View style={{flex:1}}>
      <ActivitiesModal
        events={events}
        close={goBack}
        onEdit={editActivity}
        onAdd={addActivity}
      />

      <EditModal
        visible={isEditing}
        activity={activityToEdit}
        close={closeActivityModal}
        ok={submitActivityChanges}
        onDelete={removeDeletedActivity}
      />

      <AddModal
        visible={isAdding}
        close={closeActivityModal}
        ok={submitNewActivity}
      />
    </View>
  )
}
