import React, { useEffect, useMemo, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAlertColor, getFormattedTime } from '../utils';

const TaskView = ({ task }) => {
  const color = useMemo(() => getAlertColor(task.alert), [task.alert]);
  const time = useMemo(() => getFormattedTime(task.start), [task.start]);
  const title = useMemo(() => task.title, [task.title]);

  // console.log({ time, title, color });

  return (
    <View style={[styles.cardContainer, styles.cardShadow, styles.flexContainer]}>
      <Text style={[styles.text]}>
        {time}
      </Text>

      <Text style={[styles.text, styles.titleText]}>
        {title}
      </Text>

      {color &&
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
