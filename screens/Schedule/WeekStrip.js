import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DateWidget } from './DateWidget';

export const WeekStrip = ({ days, today }) => {
  return (
    <View
      style={[styles.container]}
    >
      {
        days.map((date, index) =>
          <DateWidget isoDate={date} today={today} key={index} />
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  }
});
