import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { format, isEqual, parseISO } from 'date-fns';
import { AuthContext } from '../../contexts/Authentication';
import { createStyle } from '../../styles';

export const DateWidget = ({ isoDate, today, workingDate, setWorkingDate }) => {
  const { colorScheme } = useContext(AuthContext)
  const styles = createStyle('dateWidget', colorScheme);
  const [roundedStyle, setRoundedStyle] = useState([styles.round]);
  const isoToday = parseISO(today);
  const dow = format(isoDate, 'EEEE').slice(0, 3);
  const isCurrent = isEqual(isoToday, isoDate);
  const date = format(new Date(isoDate), 'yyyy-MM-dd');
  const isWorkingDate = workingDate === date;

  const handleTouch = () => {
    setWorkingDate(date);
  }

  useEffect(() => {
    console.log('*** ', {date, isCurrent, isWorkingDate});
    if (isWorkingDate) {
      setRoundedStyle([styles.circle, styles.selected]);
      return;
    }

    if (isCurrent) {
      setRoundedStyle([styles.circle, styles.current]);
      return;
    }

    setRoundedStyle([styles.circle]);
  }, [date, isCurrent, isWorkingDate]);

  return (
    <View style={[styles.container]}>
      <Text style={[styles.dow]}>{dow}</Text>
      <TouchableOpacity
       onPress={handleTouch}
       style={roundedStyle}
      >
        <Text style={[styles.text]}>{isoDate.getDate()}</Text>
      </TouchableOpacity>
    </View>
  );
};
