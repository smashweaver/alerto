import { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { AppContext } from '../../contexts/appContext';
import { createTheme } from '../../themes';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Toolbar } from './Toolbar';

const Theme = createTheme();

const sleepCycle = (code) => {
  if (!code) return 'Set your schedule';

  const map = {
    'mono': 'Monophasic',
    'bi': 'Biphasic',
    'everyman': 'Everyman',
    'uberman': 'Uberman',
    'dymaxion': 'Dymaxion',
  }
  return map[code];
};

export default function Settings() {
  const { profile, features: { surveyEnabled } } = useContext(AppContext);
  const navigation = useNavigation();

  const disabledGroup = [styles.groupValue, { opacity: 0.3 }];
  const enabledGroup = [styles.groupValue];

  const [activitiesGroupStyle, setActivitiesGroupStyle] = useState(disabledGroup);
  const [isActivitiesDisabled, setIsActivitiesDisabled] = useState(true);

  const scheduleText = sleepCycle(profile.schedule);

  const manageActivities = () => {
    navigation.navigate('SettingActivities');
  }

  const manageSchedule = () => {
    navigation.navigate('SettingSchedule');
  };

  const checkSurvey= () => {
    if (!profile.survey) {
      navigation.navigate('SurveyIndex');
    }
  };

  useEffect(() => {
    console.log('*** mounting Settings');
    return () => console.log('*** unmounting Settings');
  }, []);

  useEffect(() => {
    console.log('*** profile has changed');
    if (profile.schedule) {
      setActivitiesGroupStyle(enabledGroup);
      setIsActivitiesDisabled(false);
    } else {
      setActivitiesGroupStyle(disabledGroup);
      setIsActivitiesDisabled(true);
    }
  }, [profile]);

  useFocusEffect(() => {
    console.log('*** screen changed: Settings');
    if (surveyEnabled) checkSurvey();
  });

  return (
    <View edges={[]} style={styles.container}>
      <Toolbar />
      <View style={{ padding: 20 }}>
        <View style={styles.group}>
          <View style={styles.groupIcon}>
            <MaterialIcons name="schedule" size={20} color='gray' />
          </View>
          <View style={enabledGroup}>
            <TouchableOpacity onPressOut={manageSchedule}>
              <Text style={{fontSize: 20, color:'#F8F9FA'}}>{scheduleText}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.group}>
          <View style={styles.groupIcon}>
            <MaterialIcons name="event-available" size={20} color='gray' />
          </View>
          <View style={activitiesGroupStyle}>
            <TouchableOpacity disabled={isActivitiesDisabled} onPressOut={manageActivities}>
              <Text style={{fontSize: 20, color:'#F8F9FA'}}>{'Set your default activities'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Theme.colors.background,
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
