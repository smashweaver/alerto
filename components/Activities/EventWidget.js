import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AppContext } from '../../contexts/appContext';
import { createStyle } from '../../styles';
import { calcStart, getFormattedEndTime, getFormattedTime, getAlertColor} from '../../utils';
import { Ionicons } from '@expo/vector-icons';
import { createTheme } from '../../themes';

export const EventWidget = ({ isEditable=true, task, remove, edit }) => {
  const { colorScheme } = useContext(AppContext);
  const Theme = createTheme(colorScheme);
  const styles = createStyle('eventWidget', colorScheme);
  const color = getAlertColor(task.alert);
  const start = getFormattedTime(task.hour, task.min);

  const handleDelete = () => remove(task);
  const handleEdit = () => edit(task);

  const endTime = getFormattedEndTime(calcStart(task), task.duration);

  return (
    <TouchableOpacity
      disabled={!isEditable}
      activeOpacity={0.6}
      onLongPress={handleEdit}
      style={[styles.container]}
    >
      <View style={[styles.flexContainer]}>
        <Text style={[styles.start, styles.text]}>
          {start} - {endTime}
        </Text>

        {color && <Ionicons name="alert-circle" size={20} color={color} style={{marginRight: 4}} />}
      </View>

      <Text style={[styles.title, styles.text]}>
        {task.title}
      </Text>
    </TouchableOpacity>
  )
}
