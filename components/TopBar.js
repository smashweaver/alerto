import React from 'react';
import { StyleSheet, Text } from 'react-native';

const TopBar = ({ today }) => {
  return (
    <Text style={styles.today}>{today}</Text>
  )
};

const styles = StyleSheet.create({
  today: {
    color: '#101113',
    paddingHorizontal: 4,
    paddingVertical: 4,
    backgroundColor: '#B197FC',
  },
});

export { TopBar };
