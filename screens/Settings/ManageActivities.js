import { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button  } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../../contexts/appContext';
import { createTheme } from '../../themes';
import { Activities } from '../../components/Activities';
import { getFormattedTime } from '../../utils';
import { calcStart } from '../../utils';
import { EventWidget } from './EventWidget';
import { EditModal } from './EditModal';
import { AddModal } from './AddModal';

const Theme = createTheme();

export default function ManageActivities() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

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
            <Ionicons name="arrow-back" size={28} color={Theme.ModalHeaderTextColor} />
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

        <View style={{ margin: 10 }}>
          <Button mode='text' textColor={Theme.colors.primary} onPress={addActivity}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  header: {
    //backgroundColor: Theme.HeaderBackgroundColor,
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  text: {
    color: '#A6A7AB'
  },
});
