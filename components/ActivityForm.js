import React, { useEffect, useMemo, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createTheme } from '../themes';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { getFormattedTime } from '../utils';
import { InputDialog } from './InputDialog';
import { AlertPickerModal } from './AlertPickerModal';
import { OccurrenceDialog } from './OccurenceDialog';
import { Button } from 'react-native-paper';

import { normalizeMin, normalizeDate } from '../utils';

const Theme = createTheme();

const getOccurenceText = (value) => {
  if (!value) return '';

  const a = [];
  if (value.sun) a.push('Sun');
  if (value.mon) a.push('Mon');
  if (value.tue) a.push('Tue');
  if (value.wed) a.push('Wed');
  if (value.thu) a.push('Thu');
  if (value.fri) a.push('Fri');
  if (value.sat) a.push('Sat');

  if (a.length === 0) return 'Disabled';
  if (a.length === 7) return 'Everyday';

  return a.join(', ');
};

export const ActivityForm = ({ activity, ok, close, name, showOccurence=false, onDelete=()=>{} }) => {
  const data = { ...activity };
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState(data.title);
  const [hour, setHour] = useState(data.hour);
  const [min, setMin] = useState(normalizeMin(data.min));
  const [duration, setDuration] = useState(data.duration);
  const [note, setNote] = useState(data.note);
  const [alert, setAlert] = useState(data.alert);

  // valid only in profile.events
  const [custom, setCustom ] = useState(data.custom);
  const [occurence, setOccurence] = useState(data.occurence || false);
  const [disable, setDisable] = useState(data.disable || false);

  const [pickTime, setPickTime] = useState(false);
  const [pickNote, setPickNote] = useState(false);
  const [pickAlert, setPickAlert] = useState(false);
  const [pickDuration, setPickDuration] = useState(false);
  const [pickOccurence, setPickOccurence] = useState(false);
  const [date, setDate] = useState(new Date());
  const [formattedTime, setFormattedTime] = useState(getFormattedTime(hour, min));
  const [color, setColor] = useState('black');
  const occurenceText = useMemo(() => getOccurenceText(occurence), [occurence]);

  const handleCancel = () => close();
  const handleCancelAlert = () => setPickAlert(false);
  const handleCancelChangeNote = () => setPickNote(false);
  const handleCancelOccurence = () => setPickOccurence(false);
  const handleTime = () => setPickTime(true);
  const handleNote = () => setPickNote(true);
  const handleAlert = () => setPickAlert(true);
  const handleDuration = () => setPickDuration(true);
  const handleOccurence = () => setPickOccurence(true);

  const handleSubmit = () => {
    if (!title) {
      Alert.alert(
        'This activity is missing a title!',
        'Put in a short but descriptive title for this activity (20 chars max)',
        [
          {
            text: "OK",
          }
        ]
      );
    } else {
      ok({
        title,
        note,
        hour,
        min,
        alert,
        duration,
        custom,
        occurence,
        disable,
      });
    }
  };

  const handleChangeOccurence = (value) => {
    console.log('*** change occurence:', value);
    setOccurence({...value});
    setPickOccurence(false);
  };

  const handleChangeDuration = (newDate) => {
    const hrs = newDate.getHours();
    const mins = newDate.getMinutes();
    const value = hrs * 60 + mins;
    console.log('*** change duration:', value);
    setDuration(value);
    setPickDuration(false);
  };

  const handleChangeTime = (newDate) => {
    const newHour = newDate.getHours();
    const newMin = newDate.getMinutes();
    console.log('*** change time:', getFormattedTime(newHour, newMin));
    setHour(newHour);
    setMin(newMin);
    setPickTime(false);
  };

  const handleChangeNote = (value) => {
    setPickNote(false);
    setNote(value)
  };

  const handleChangeAlert = (level) => {
    console.log('*** change alert:', level)
    setAlert(level);
    setPickAlert(false);
  };

  const marginTop = Platform.OS === 'ios' ? insets.top : 0;
  const marginBottom = Platform.OS === 'ios' ? insets.bottom + 10: 20;

  useEffect(() => {
    if (!activity) {
      setHour(date.getHours());
      let m = normalizeMin(date.getMinutes());
      setMin(m);
    }
  }, [activity]);

  useEffect(() => {
    if (alert === 0) setColor('#1A1B1E');
    if (alert === 1) setColor('green');
    if (alert === 2) setColor('yellow');
    if (alert === 3) setColor('red');
  }, [alert]);

  useEffect(() => {
    if (!note && alert>0) setAlert(0);
    if (note && alert===0) setAlert(1);
  }, [note, alert]);

  useEffect(() => {
    setFormattedTime(getFormattedTime(hour, min));
    setDate(normalizeDate(hour, min))
  }, [hour, min]);

  return (
    <View style={[styles.container, { marginTop }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleCancel}
        >
          <Feather name="x" size={24} color={Theme.ModalHeaderTextColor}  />
        </TouchableOpacity>

        <Text style={[styles.text, { fontSize:22, marginLeft: 20 }]}>{name}</Text>

        <TouchableOpacity onPress={handleSubmit}>
          <Ionicons name="checkmark" size={24} color={Theme.ModalHeaderTextColor} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 8, padding: 20 }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.group}>
          <View style={styles.groupIcon}>
            <MaterialIcons name="title" size={20} color='red' />
          </View>

          <View style={styles.groupValue}>
            <TextInput
              maxLength={20}
              onChangeText={setTitle}
              value={title}
              placeholder='Title'
              placeholderTextColor={'#F8F9FA'}
              color='#FFF'
              style={{fontSize: 20}}
            />
          </View>
        </View>

        <View style={styles.group}>
          <View style={styles.groupIcon}>
            <Ionicons name="time-outline" size={20} color='gray' />
          </View>

          <View style={styles.groupValue}>
            <TouchableOpacity
              onPressOut={handleTime}
            >
              <Text style={{fontSize: 20, color:'#F8F9FA'}}>{formattedTime}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.group}>
          <View style={styles.groupIcon}>
            <MaterialCommunityIcons name="timer-sand" size={20} color='gray' />
          </View>

          <View style={styles.groupValue}>
            <TouchableOpacity
              onPressOut={handleDuration}
            >
              <Text style={{fontSize: 20, color:'#F8F9FA'}}>{duration} minutes</Text>
            </TouchableOpacity>
          </View>
        </View>

        {showOccurence &&
        <View style={styles.group}>
          <View style={styles.groupIcon}>
            <MaterialCommunityIcons name="calendar-week" size={20} color='gray' />
          </View>

          <View style={styles.groupValue}>
            <TouchableOpacity
              onPress={handleOccurence}
            >
              <Text style={{fontSize: 20, maxHeight: 36, color:'#F8F9FA'}}>
                {occurenceText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>}

        <View style={styles.group}>
          <View style={styles.groupIcon}>
            <Entypo name="text" size={20} color='gray' />
          </View>

          <View style={styles.groupValue}>
            <TouchableOpacity
              onPress={handleNote}
            >
              <Text style={{fontSize: 20, maxHeight: 36, color:'#F8F9FA'}}>{note || 'Note'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.group}>
          <View style={styles.groupIcon}>
            <Feather name="bell" size={20} color='gray' />
          </View>

          <View style={styles.groupValue}>
            <TouchableOpacity
              onPress={handleAlert}
            >
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
                <Text style={{fontSize: 20, color:'#F8F9FA'}}>Alert</Text>
                <FontAwesome name="bell-o" size={20} color={color} />
              </View>

            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      <View style={custom ? {marginBottom} : {display:'none'}}>
        <Button textColor={Theme.colors.primary} onPress={onDelete}>
          Delete
        </Button>
      </View>

      <OccurrenceDialog
        value={occurence}
        isVisible={pickOccurence}
        onDismiss={handleCancelOccurence}
        onChange={handleChangeOccurence}
      />

      <AlertPickerModal
        isVisible={pickAlert}
        initial={alert}
        close={handleCancelAlert}
        onChange={handleChangeAlert}
      />

      <InputDialog
        isVisible={pickNote}
        title={'Write a Note'}
        initial={note}
        ok={handleChangeNote}
        cancel={(handleCancelChangeNote)}
      />

      <DateTimePickerModal
        isVisible={pickTime}
        date={date}
        mode='time'
        minuteInterval={5}
        onConfirm={handleChangeTime}
        onCancel={() => setPickTime(false)}
      />

      <DateTimePickerModal
        is24hour={true}
        isVisible={pickDuration}
        date={new Date(new Date().setHours(0, duration, 0, 0))}
        mode='time'
        minuteInterval={5}
        locale='en_GB'
        onConfirm={handleChangeDuration}
        onCancel={() => setPickDuration(false)}
      />
    </View>
  );
};

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
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: Theme.HeaderBackgroundColor,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  text: {
    color: '#A6A7AB'
  },
});
