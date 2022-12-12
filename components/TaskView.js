import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaskView = ({ task }) => {
  const { alert, start, title } = task;
  let color = '';

  if (alert) {
    switch (alert) {
      case 1:
        color = 'green';
        break;
      case 2:
        color = 'yellow';
        break;
      case 3:
        color = 'red'
    }
  }

  const hour = start > 12 ?  start - 12 : start === 0 ? 12 : start;
  const amPm = start < 12 ? 'am' : 'pm';
  const time = `${hour}${amPm}`;

  console.log({ time, alert, color });

  return (
    <View style={[styles.cardContainer, styles.cardShadow, styles.flexContainer]}>
      <Text style={[styles.text]}>
        {time}
      </Text>

      <Text style={[styles.text, styles.titleText]}>
        {title}
      </Text>

      {alert &&
        <Ionicons name="alert-circle" size={30} color={color} style={{ marginLeft: 'auto' }} />}
    </View>
  )
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContext: 'center',
    justifyContent: 'flex-start',
  },
  cardContainer: {
    backgroundColor: '#D0BFFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    minHeight: 150,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
  titleText: {
    marginLeft: 10,
    textDecorationLine: 'underline',
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  }
});

export { TaskView };
