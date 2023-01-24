import React, { useContext, useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { format } from 'date-fns';
import { AppContext } from '../contexts/appContext';
import { createTheme } from '../themes';

const DateBar = ({ date }) => {
  const today = useMemo(() => format(new Date(date), 'EEEE, PPP'), [date]);
  const { colorScheme } = useContext(AppContext)
  const Theme = createTheme(colorScheme);

  const styles = StyleSheet.create({
    container: {
      color: Theme.colors.text,
      backgroundColor: Theme.HeaderBackgroundColor,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
  });

  return <Text style={styles.container}>{today}</Text>;
};

export { DateBar };
