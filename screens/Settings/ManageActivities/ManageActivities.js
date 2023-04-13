import { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button  } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../../../contexts/appContext';
import { createTheme } from '../../../themes';
import { Activities } from '../../../components';
import { getFormattedTime } from '../../../utils';
import { calcStart } from '../../../utils';
import { EventWidget } from './EventWidget';
import { EditModal } from './EditModal';
import { AddModal } from './AddModal';
import { ActivityModal } from '../../../components';
import uuid from 'react-native-uuid';

const Theme = createTheme();

export default function ManageActivities() {
  const navigation = useNavigation();

  const {
    user,
    profile,
    api: {
      updateProfileEvents,
    }
  } = useContext(AppContext);

  const [events, setEvents] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activityToEdit, setActivityToEdit] = useState(null);
  const [isProcessing, setProcessing] = useState(false);

  const submitActivityChanges = async (activity, data) => {
    const index = events.findIndex(x => x === activity);
    console.log('*** profile event changed', { index });
    const newEvents = [...events];
    newEvents[index] = { ...activity, ...data };
    setProcessing(true);
    await updateProfileEvents(user.uid, { events: [...newEvents]});
    setProcessing(false);
    closeActivityModal();
  };

  const submitNewActivity = async(activity) => {
    const newEvents = [...events, { ...activity }];
    setProcessing(true);
    await updateProfileEvents(user.uid, { events: [...newEvents]});
    setProcessing(false);
    closeActivityModal();
  };

  const removeActivity = async (activity) => {
    const newEvents = events.filter(x => x !== activity);
    setProcessing(true);
    await updateProfileEvents(user.uid, { events: [...newEvents]});
    setProcessing(false);
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
      <View style={styles.container}>
        <View style={[styles.header, styles.flex]}>
          <TouchableOpacity onPress={goBack}>
            <Ionicons name="arrow-back" size={28} color={Theme.colors.text} />
          </TouchableOpacity>

          <Text style={[styles.text, { fontSize:24, marginLeft: 20 }]}>{'Manage Activities'}</Text>

          <View>
            <Ionicons name="checkmark" size={28} color={'transparent'} />
          </View>
        </View>

        <Activities
          Widget={EventWidget}
          events={events}
          onEdit={editActivity}
        />

        <View>
          <Button textColor={Theme.colors.primary} onPress={addActivity}>
            New Activity
          </Button>
        </View>
      </View>

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

      <ActivityModal visible={isProcessing} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    height: '100%',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: Theme.HeaderBackgroundColor,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  text: {
    color: Theme.colors.text,
  },
});
