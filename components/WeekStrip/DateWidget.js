import React, { useContext, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { AppContext } from '../../contexts/appContext';
import { createStyle } from '../../styles';
import { formatDate } from '../../utils';

export const DateWidget = ({ isoDate, today, workingDate, setWorkingDate }) => {
  const { colorScheme } = useContext(AppContext)
  const styles = createStyle('dateWidget', colorScheme);
  const [roundedStyle, setRoundedStyle] = useState([styles.round]);
  // const isoToday = parseISO(today);
  const dow = format(isoDate, 'EEEE').slice(0, 3);
  //const isToday = isEqual(isoToday, isoDate);
  // const date = format(new Date(isoDate), 'yyyy-MM-dd');
  const date = formatDate(new Date(isoDate));
  const isToday = today === date;
  const isWorkingDate = workingDate === date;

  // console.log('>>>', {date, isToday, isWorkingDate})

  const handleTouch = () => {
    setWorkingDate(date);
  }

  useEffect(() => {
    if (isWorkingDate) {
      setRoundedStyle([styles.circle, styles.selected]);
      return;
    }

    if (isToday) {
      setRoundedStyle([styles.circle, styles.current]);
      return;
    }

    setRoundedStyle([styles.circle]);
  }, [date, isToday, isWorkingDate]);

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
