import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { AppContext } from '../../contexts/appContext';
import { createTheme } from '../../themes';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { ActivitiesModal } from './ActivitiesModal';

const Theme = createTheme();

const sleepCycle = (code) => {
  if (!code) return 'Set your schedule';

  const map = {
    'mono': 'Monophasic Schedule',
    'bi': 'Biphasic Schedule',
    'everyman': 'Everyman Schedule',
    'uberman': 'Uberman Schedule',
    'dymaxion': 'Dymaxion Schedule',
  }
  return map[code];
};

export default function Settings() {
  const { profile } = useContext(AppContext);
  const [events, setEvents] = useState([...profile.events]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activityToEdit, setActivityToEdit] = useState(null);

  const [isPickSchedule, setPickSchedule] = useState(false);
  const [isManageActivities, setManageActivities] = useState(false);

  const disabledGroup = [styles.groupValue, { opacity: 0.3 }];
  const enabledGroup = [styles.groupValue];

  const [activitiesGroupStyle, setActivitiesGroupStyle] = useState(disabledGroup);
  const [isActivitiesDisabled, setIsActivitiesDisabled] = useState(true);

  const scheduleText = sleepCycle(profile.schedule);

  const pickSchedule = () => setPickSchedule(true);
  const manageActivities = () => setManageActivities(true);

  const closeActivities = () => setManageActivities(false);

  const deleteActivity = (activity) => {
    console.log('*** delete activity', activity)
  };

  const editActivity = (activity) => {
    console.log('*** edit activity', activity)
  };

  const addActivity = () => {
    console.log('*** add activity');
  };

  useEffect(() => {
    console.log('*** mounting Settings');
    return () => console.log('*** unmounting Settings');
  }, []);

  useEffect(() => {
    if (profile.schedule) {
      setActivitiesGroupStyle(enabledGroup);
      setIsActivitiesDisabled(false);
    } else {
      setActivitiesGroupStyle(disabledGroup);
      setIsActivitiesDisabled(true);
    }
  }, [profile.schedule]);

  useFocusEffect(() => {
    console.log('*** screen changed: Settings');
  });

  return (
    <View edges={[]} style={{ flex: 1, padding: 20 }}>
      <View style={styles.group}>
        <View style={styles.groupIcon}>
          <MaterialIcons name="schedule" size={20} color="gray" />
        </View>
        <View style={enabledGroup}>
          <TouchableOpacity onPressOut={pickSchedule}>
            <Text style={{fontSize: 20, color:'#F8F9FA'}}>{scheduleText}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.group}>
        <View style={styles.groupIcon}>
          <MaterialIcons name="event-available" size={20} color="gray" />
        </View>
        <View style={activitiesGroupStyle}>
          <TouchableOpacity disabled={isActivitiesDisabled} onPressOut={manageActivities}>
            <Text style={{fontSize: 20, color:'#F8F9FA'}}>{'Manage your activities'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ActivitiesModal
        visible={isManageActivities}
        events={events}
        close={closeActivities}
        onDelete={deleteActivity}
        onEdit={editActivity}
        onAdd={addActivity}
      />
    </View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Theme.ContainerBackgroundColor,
	},
  group: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'center',
    paddingBottom: 24,
    width: '100%',
  },
  groupIcon: {
    marginRight: 20,
  },
  groupValue: {
    flex: 1,
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10,
    marginTop: 6,
  },
  header: {
    backgroundColor: Theme.HeaderBackgroundColor,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    alignContent: 'center',
    display: 'flex',
    paddingBottom: 16
  },
  text: {
    color: '#A6A7AB'
  },
});
