import React, { useContext, useEffect, useMemo, useState  } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../contexts/Authentication';
import { getAlertColor, getFormattedTime } from '../utils';
import { createStyle } from '../styles';

const EventView = ({ openModal, coords, task }) => {
  const { time, setActive, colorScheme } = useContext(AuthContext);
  const styles = createStyle('eventViewStyle', colorScheme);
  const color = useMemo(() => getAlertColor(task.alert), [task.alert]);
  const formattedTime = useMemo(() => getFormattedTime(task.hour, task.min), [task.hour, task.min]);
  const start = useMemo(() => task.hour*60+task.min, [task.hour, task.min]);
  const [focusStyle, setFocusStyle] = useState(styles.normal);

  const onPress = () => openModal(task);

  useEffect(() => {
    if (start === time) {
      console.log('*** event activated:', task.id);
      setFocusStyle(styles.active);
      setTimeout(() => setActive(task.id), 150);
    } else {
      setFocusStyle(styles.normal);
    }
  }, [time, start, colorScheme]);

  return (
    <View
      key={task.id}
      style={[styles.cardContainer, styles.cardShadow, styles.flexContainer, styles.current, focusStyle]}
      onLayout={event => {
        const layout = event.nativeEvent.layout;
        coords[task.id] = layout.y;
      }}
    >
      <Text style={[styles.text]}>
        {formattedTime}
      </Text>

      <Text style={[styles.text, styles.titleText]}>
        {task.title}
      </Text>

      {color &&
        <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={onPress}>
          <Ionicons name="alert-circle" size={30} color={color} />
        </TouchableOpacity>}
    </View>
  )
};

export { EventView };
