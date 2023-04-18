import { useContext, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../../../contexts/appContext';
import { createTheme } from '../../../themes';
import { createStyle } from '../../../styles';
import { calcStart,
  getFormattedTime,
  getFormattedEndTime,
  getAlertColor
} from '../../../utils';

export function EventWidget({ task, remove, edit }) {
  const { colorScheme } = useContext(AppContext);
  const Theme = createTheme(colorScheme);
  const styles = createStyle('eventWidget', colorScheme);
  const color = getAlertColor(task.alert);
  const isDeletable = !!task.custom;
  const start = getFormattedTime(task.hour, task.min);
  const [disabled, setDisabled] = useState(!!task.disabled)

  const statusText = useMemo(() => disabled ? 'Disabled' : 'Enabled', [disabled]);

  const handleEdit = () => edit(task);

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

      <View style={[styles.flex, {justifyContent:'flex-start'}]}>
         <MaterialCommunityIcons name="calendar-week" size={16} color='gray' />

         <OccurrenceView value={task.occurence} />
      </View>

      <Text style={[styles.title, styles.text]}>
        {task.title}
      </Text>
    </TouchableOpacity>
  )
}

function OccurrenceView({ value={} }) {
  return (
    <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-start', marginLeft:5}}>
      <DayView caption='S' value={value.sun} />
      <DayView caption='M' value={value.mon} />
      <DayView caption='T' value={value.tue} />
      <DayView caption='W' value={value.wed} />
      <DayView caption='T' value={value.thu} />
      <DayView caption='F' value={value.fri} />
      <DayView caption='S' value={value.sat} />
    </View>
  )
}

function DayView({ caption='M', value=true }) {
  const color = value ? '#B197FC' : '#868E96';

  return(
    <View style={{marginRight:5}}>
      <Text style={{color}}>{caption}</Text>
    </View>
  )
}