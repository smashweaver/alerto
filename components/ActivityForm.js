import React, { useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createTheme } from '../themes';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { getFormattedTime } from '../utils';
import Dialog from "react-native-dialog";
import { InputDialog } from './InputDialog';
import { Picker } from '@react-native-picker/picker';

const Theme = createTheme();

const newActivity = {
  title: '',
  hour: 0,
  min: 0,
  note: '',
};

export const ActivityForm = ({ ok, close, activity }) => {
  const payload = !activity ? { ...newActivity } : { ...activity };

  const [title, setTitle] = useState(payload.title);
  const [hour, setHour] = useState(payload.hour);
  const [min, setMin] = useState(payload.min);
  const [note, setNote] = useState(payload.note);
  const [alert, setAlert] = useState(payload.alert);

  useEffect(()=>{
    console.log('*** activity form:', payload);
  }, []);

  const [isNew] = useState(!activity);
  const [pickTime, setPickTime] = useState(false);
  const [pickNote, setPickNote] = useState(false);

  const handleChangeTime = (ev, value) => {
    console.log({ value });
    setPickTime(false);
    if (ev.type === 'set') {
      const d = new Date(value);
      const newHour = d.getHours();
      const newMin = d.getMinutes();
      console.log({ value, d, newHour, newMin });
      setHour(newHour);
      setMin(newMin);
    }
  };

  const handleCancelChangeNote = () => {
    setPickNote(false);
  };

  const handleChangeNote = (value) => {
    setPickNote(false);
    setNote(value)
  };

  const handleSubmit = () => {
    ok({ title, note, hour, min, alert });
  };

  const handleCancel = () => close();

  const handleTime = () => {
    setPickTime(true);
  };

  const handleNote = () => {
    setPickNote(true);
  };

  return (
    <View style={[styles.container, { marginTop: 0 }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleCancel}
        >
          <Feather name="x" size={26} color={Theme.ModalHeaderTextColor}  />
        </TouchableOpacity>

        <Text style={[styles.text, { fontSize: 18, marginLeft: 20 }]}>New Activity</Text>

        <TouchableOpacity
          onPress={handleSubmit}
          style={{ marginLeft: 'auto'}}
        >
          <Ionicons name="checkmark" size={26} color={Theme.ModalHeaderTextColor} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.bottom}>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 20 }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.group}>
          <View style={styles.groupIcon}>
            <MaterialIcons name="title" size={20} color='red' />
          </View>

          <View style={styles.groupValue}>
            <TextInput
              onChangeText={setTitle}
              value={title}
              placeholder='Title'
              placeholderTextColor={'#F8F9FA'}
              color='#FFF'
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
              <Text style={{color:'#F8F9FA'}}>{getFormattedTime(hour, min)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.group}>
          <View style={styles.groupIcon}>
            <Entypo name="text" size={20} color='gray' />
          </View>

          <View style={styles.groupValue}>
            <TouchableOpacity
              onPress={handleNote}
            >
              <Text style={{color:'#F8F9FA', maxHeight: 20, maxWidth: '100%'}}>{note || 'Note'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.group}>
          <View style={styles.groupIcon}>
            <Feather name="bell" size={20} color='gray' />
          </View>

          <View style={styles.groupValue}>
            <Picker
              style={{
                margin: -8,
                color: '#F8F9FA',
                height: 0,
                width: '100%',
              }}
              mode={'dialog'}
              selectedValue={alert}
              onValueChange={value => setAlert(value)}
            >
              <Picker.Item label="None" value={0} />
              <Picker.Item label="Green" value={1} />
              <Picker.Item label="Yellow" value={2} />
              <Picker.Item label="Red" value={3} />

            </Picker>
          </View>
        </View>

      </ScrollView>
      </KeyboardAvoidingView>

      {pickTime &&
        <DateTimePicker
          value={new Date()}
          mode='time'
          minuteInterval={15}
          onChange={handleChangeTime}
          positiveButton={{label: 'OK', textColor: 'green'}}
        />
      }

      {pickNote &&
        <InputDialog title={'Write a Note'} initial={note} ok={handleChangeNote}  cancel={handleCancelChangeNote} />
      }

    </View>
  );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Theme.ContainerBackgroundColor,
		//color: "#FFF",
		//padding: 30,
		//width: Dimensions.get("window").width
	},
  group: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'center',
    paddingBottom: 24,
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
  input: {
    backgroundColor: '#FFF',
    //padding: 10,
    //color: '#FFF',
    height: 92,
  },
	bottom: {
		flex: 1,
		justifyContent: "flex-end",
		marginBottom: 36
	},
	button: {
		marginBottom: 30
	}
});


/*
  <View style={{ maxHeight: 100 }}>
    <TextInput
      placeholder="Enter here"
      multiline={true}
      maxLength={500}
      maxHeight={200}
      textAlignVertical="top"
      style={styles.input}
    />
  </View>

  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.bottom}>
    <Button title='Save' style={styles.button} appearance="filled" onPress={saveNote} />
  </KeyboardAvoidingView>

<TouchableOpacity>
  <Text style={{color:'#F8F9FA'}}>Alert</Text>
</TouchableOpacity>
*/