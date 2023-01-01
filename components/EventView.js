import React, { useContext, useEffect, useMemo, useState  } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../contexts/Authentication';
import { getAlertColor, getFormattedTime } from '../utils';
import { createStyle } from '../styles';

const EventView = ({ openModal, coords, task }) => {
  const { hour, setActive, colorScheme } = useContext(AuthContext);
  const styles = createStyle('eventViewStyle', colorScheme);

  const color = useMemo(() => getAlertColor(task.alert), [task.alert]);
  const time = useMemo(() => getFormattedTime(task.start), [task.start]);
  const [focusStyle, setFocusStyle] = useState(styles.normal);

  const { title, start } = task;

  /*useEffect(() => {
    console.log({ title, start, id: task.id, hour });
  }, []);*/

  const onPress = () => openModal(task);

  useEffect(() => {
    if (start === hour) {
      console.log('*** event activated:', task.id);
      setFocusStyle(styles.active);
      setTimeout(() => setActive(task.id), 150);
    } else {
      setFocusStyle(styles.normal);
    }
  }, [hour, start, colorScheme]);

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
        {time}
      </Text>

      <Text style={[styles.text, styles.titleText]}>
        {title}
      </Text>

      {color &&
        <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={onPress}>
          <Ionicons name="alert-circle" size={30} color={color} />
        </TouchableOpacity>}
    </View>
  )
};

export { EventView };
