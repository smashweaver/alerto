import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DateWidget } from './DateWidget';

export const WeekStrip = ({ days, today, workingDate, setWorkingDate }) => {
  return (
    <View
      style={[styles.container]}
    >
      {
        days.map((date, index) =>
          <DateWidget
            isoDate={date}
            today={today}
            workingDate={workingDate}
            setWorkingDate={setWorkingDate}
            key={index}
          />
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 8
  }
});
