import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { format } from 'date-fns';
import { AppContext } from '../contexts/appContext';
import { createTheme } from '../themes';

const DateBar = ({ date }) => {
  const today = format(new Date(date), 'EEEE, PPP');
  const { colorScheme } = useContext(AppContext)
  const Theme = createTheme(colorScheme);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: Theme.HeaderBackgroundColor,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
  });

  return (
    <View style={[styles.container]}>
      <Text style={{color: Theme.colors.text}}>{today}</Text>
    </View>
  )
};

export { DateBar };
