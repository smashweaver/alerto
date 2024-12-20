import React, { useContext, useEffect, useMemo, useState  } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../../contexts/appContext';
import { calcStart, getAlertColor, getFormattedEndTime, getFormattedTime } from '../../utils';
import { createStyle } from '../../styles';

const EventView = ({ openModal, coords, task }) => {
  const { time, colorScheme } = useContext(AppContext);
  const styles = createStyle('eventViewStyle', colorScheme);
  const color = useMemo(() => getAlertColor(task.alert), [task.alert]);
  const formattedTime = useMemo(() => getFormattedTime(task.hour, task.min), [task.hour, task.min]);
  const start = useMemo(() => task.hour*60+task.min, [task.hour, task.min]);
  const [focusStyle, setFocusStyle] = useState(styles.normal);

  const endTime = getFormattedEndTime(calcStart(task), task.duration);

  const handlePress = () => openModal(task);

  useEffect(() => {
    //console.log(task)
    if (time >= start && time < start+task.duration ) {
      console.log('*** event activated:', {task, start});
      setFocusStyle(styles.active);
    } else {
      setFocusStyle(styles.normal);
    }
  }, [time, start, colorScheme]);

  return (
    <View
      style={[styles.cardContainer, focusStyle]}
      onLayout={event => {
        const layout = event.nativeEvent.layout;
        coords[task.id] = layout.y;
      }}
    >
      <View style={styles.flexContainer}>
        <Text style={[styles.text]}>
          {formattedTime} - {endTime}
        </Text>

        {color &&
          <TouchableOpacity onPress={handlePress}>
            <Ionicons name="alert-circle" size={30} color={color} />
          </TouchableOpacity>}

      </View>

      <Text style={[styles.text, styles.titleText]}>
        {task.title}
      </Text>


    </View>
  )
};

export { EventView };
