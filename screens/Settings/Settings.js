import { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { AppContext } from '../../contexts/appContext';
import { createTheme } from '../../themes';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Toolbar } from './Toolbar';
import { useRecommender } from '../../hooks';
import { ActivityModal } from '../../components';

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

export default function Settings({ route: { params } }) {
  const { profile, features: { surveyEnabled } } = useContext(AppContext);
  const [recommendations, isProcessing, process] = useRecommender();
  const [surveyText, setSurveyText] = useState('...');

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

  const retakeSurvey = () => {
    navigation.navigate({ name: 'SurveyIndex', params: { retake: true }});
  }

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
  }, [profile.schedule]);

  useEffect(() => {
    if (!profile.survey) return;
    console.log(profile.survey);
    process(profile.survey.results)
  }, [profile.survey])

  useEffect(() => {
    if (!recommendations.length) return;
    setSurveyText(`${recommendations.join(', ')}`);
  }, [recommendations])


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
              <Text style={{fontSize: 20, color:Theme.colors.text}}>{scheduleText}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.group}>
          <View style={styles.groupIcon}>
            <MaterialIcons name="event-available" size={20} color='gray' />
          </View>
          <View style={activitiesGroupStyle}>
            <TouchableOpacity disabled={isActivitiesDisabled} onPressOut={manageActivities}>
              <Text style={{fontSize: 20, color:Theme.colors.text}}>{'Set your activities'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {profile.survey &&
        <View style={[styles.group, {paddingBottom:4}]}>
          <View style={styles.groupIcon}>
            <Octicons name="checklist" size={20} color='gray' />
          </View>
          <View>
            <TouchableOpacity onPressOut={retakeSurvey}>
              <Text style={{fontSize: 20, color:Theme.colors.text}}>{'Retake the survey'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        }

        {profile.survey &&
        <View style={{marginLeft:40, padding:0}}>
          <Text style={{color:Theme.colors.primary, fontSize:12}}>{surveyText}</Text>
        </View>}

        <ActivityModal visible={isProcessing} />

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
