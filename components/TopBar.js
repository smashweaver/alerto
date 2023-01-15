import React, { useContext, useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { format } from 'date-fns';
import { AppContext } from '../contexts/appContext';
import { createTheme } from '../themes';

const TopBar = ({ date }) => {
  const today = useMemo(() => format(new Date(date), 'EEEE, PPP'), [date]);
  const { colorScheme } = useContext(AppContext)
  const Theme = createTheme(colorScheme);

  const styles = StyleSheet.create({
    today: {
      color: Theme.PrimaryColor,
      backgroundColor: Theme.PrimaryBackgroundColor,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
  });

  return (
    <Text style={styles.today}>{today}</Text>
  )
};

export { TopBar };
