import React, { useContext, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { format, isEqual, parseISO } from 'date-fns';
import { AuthContext } from '../../contexts/Authentication';
import { createStyle } from '../../styles';

export const DateWidget = ({ isoDate, today }) => {
  console.log({ isoDate, today });
  const { colorScheme } = useContext(AuthContext)
  const styles = createStyle('dateWidget', colorScheme);
  const [roundedStyle, setRoundedStyle] = useState([styles.round]);
  const [isoToday] = useState(parseISO(today));
  const [dow] = useState(format(isoDate, 'EEEE').slice(0, 3));
  const [isCurrent] = useState(isEqual(isoToday, isoDate));

  useEffect(() => {
    if (isCurrent) {
      setRoundedStyle([styles.circle, styles.current]);
    } else {
      setRoundedStyle([styles.circle]);
    }
  }, [isCurrent]);

  return (
    <View style={[styles.container]}>
      <Text style={[styles.dow]}>{dow}</Text>
      <TouchableOpacity style={roundedStyle}>
        <Text style={[styles.text]}>{isoDate.getDate()}</Text>
      </TouchableOpacity>
    </View>
  );
};
