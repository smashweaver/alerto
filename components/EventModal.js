import React from 'react';
import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAlertColor, getFormattedTime } from '../utils';

const EventModal = ({ close, task }) => {
  const time = getFormattedTime(task.hour, task.min);
  const color = getAlertColor(task.alert);
  const title = task.title;
  const note = task.note || '';

  return (
    <Modal
      visible={true}
      transparent={true}
      onRequestClose={close}
    >
      <View style={styles.container}>
        <View style={[styles.content, styles.shadow]}>
          <View style={styles.header}>
            <Text style={styles.text}>{time}</Text>
            <Text style={styles.text}>{title}</Text>
            <Ionicons name='alert-circle' size={28} color={color} />
          </View>

          <View style={styles.body}>
            <TouchableOpacity onPress={close}>
              <Text style={{minHeight: 150}}>{note}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 25,
  },
  content: {
    margin: '10%',
    backgroundColor: '#ffff',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  header: {
    display: 'flex',
    backgroundColor: '#6741D9',
    flexDirection: 'row',
    alignContext: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  text: {
    color: '#ffff',
    fontSize: 16,
  },
  body: {
    paddingBottom: 12,
    paddingTop: 10,
    paddingHorizontal: 10,
  }
});

export { EventModal };
