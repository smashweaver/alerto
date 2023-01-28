import React, { useContext, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AppContext } from '../../../contexts/appContext';
import { createStyle } from '../../../styles';
import { calcStart, getFormattedTime, getFormattedEndTime, getAlertColor} from '../../../utils';
import { createTheme } from '../../../themes';
import { Ionicons } from '@expo/vector-icons';

export const EventWidget = ({ task, remove, edit }) => {
  const { colorScheme } = useContext(AppContext);
  const Theme = createTheme(colorScheme);
  const styles = createStyle('eventWidget', colorScheme);
  const color = getAlertColor(task.alert);
  const isDeletable = !!task.custom;
  const start = getFormattedTime(task.hour, task.min);
  const [disabled, setDisabled] = useState(!!task.disabled)

  const statusText = useMemo(() => disabled ? 'Disabled' : 'Enabled', [disabled]);

  const handleEdit = () => edit(task);

  // const handleDelete = () => remove(task);
  // const toggleDisabled = () => {
  //   setDisabled(prev => !prev);
  // };

  // const paddingVertical = Platform.OS === 'ios' ? 5 : 0;
  // const paddingHorizontal = 10;

  const endTime = getFormattedEndTime(calcStart(task), task.duration);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onLongPress={handleEdit}
      style={[styles.container]}
    >
      <View style={[styles.flex]}>
        <View>
          <Text style={[styles.start, styles.text]}>
            <Ionicons name="time-outline" size={16} color='gray' /> {start} - {endTime}
          </Text>
        </View>

        {color && <Ionicons name="alert-circle" size={20} color={color} />}
      </View>

      <Text style={[styles.title, styles.text]}>
        {task.title}
      </Text>


    </TouchableOpacity>
  )
}

/*
<View style={[styles.actionGroup, styles.flexContainer, styles.actionGroup, { paddingHorizontal, paddingVertical,  marginVertical: 10 }]}>
  <Text style={{color: Theme.colors.text}}>{statusText}</Text>
  <Switch color={Theme.colors.primary}  value={!disabled} onValueChange={toggleDisabled} />
</View>
*/