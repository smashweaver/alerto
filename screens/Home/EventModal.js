import React from 'react';
import { StyleSheet, Modal, View, Text, Pressable, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAlertColor, getFormattedTime } from '../../utils';
import { createTheme } from '../../themes';

const Theme = createTheme();

const EventModal = ({ close, task, visible=false }) => {
  const event = task || { hour: 0, min: 0, alert: 0 };
  const time = getFormattedTime(event.hour, event.min);
  const color = getAlertColor(event.alert);
  const title = event.title;
  const note = event.note || '';

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={close}
    >
      <Pressable onPress={close}
        style={styles.container}
      >
        <View style={styles.container}>
          <View style={[styles.content, styles.shadow]}>
            <View style={styles.header}>
              <Text style={styles.text}>{time}</Text>
              <Text style={styles.text}>{title}</Text>
              <Ionicons name='alert-circle' size={28} color={color} />
            </View>

            <View style={styles.body}>
              <Text style={[{minHeight: 150}, styles.text]}>{note}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.height,
    width: Dimensions.width,
  },
  shadow: {
    shadowColor: Theme.ShadowColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  content: {
    backgroundColor: Theme.colors.background,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    minWidth: '80%',
    maxWidth: '80%',
  },
  header: {
    display: 'flex',
    backgroundColor: Theme.HeaderBackgroundColor,
    flexDirection: 'row',
    alignContext: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  text: {
    color: Theme.colors.text,
    fontSize: 16,
  },
  body: {
    paddingBottom: 12,
    paddingTop: 10,
    paddingHorizontal: 10,
  }
});

export { EventModal };
