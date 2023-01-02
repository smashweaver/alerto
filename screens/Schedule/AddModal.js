import React, { useState} from 'react';
import { Button, Dimensions, StyleSheet, TextInput, KeyboardAvoidingView, Modal, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const EventForm = () => {
  const insets = useSafeAreaInsets();
  console.log({insets});

  const [pickTime, setPickTime] = useState(false);
  const [note, setNote] = useState('hello world');

  const onChange = (ev, value) => {
    const d = new Date(value);
    const h = d.getHours();
    const m = d.getMinutes();
    console.log({ value, h, m, ev });
  };

  const saveNote = () => {

  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>New Activity</Text>

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

      {pickTime &&
        <DateTimePicker
          value={new Date()}
          mode='time'
          minuteInterval={15}
          onChange={onChange}
          positiveButton={{label: 'OK', textColor: 'green'}}
        />
      }
    </View>
  );
};

export const AddModal = ({ close }) => {
  return (
    <Modal
      visible={true}
      transparent={true}
      onRequestClose={close}
      style={{ margin: 0}}
    >
      <EventForm />
    </Modal>
  );
};


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#495057",
		//color: "#FFF",
		//padding: 30,
		//width: Dimensions.get("window").width
	},
  text: {
    color: '#FFF'
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
})