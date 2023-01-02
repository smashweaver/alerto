import React, { useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/Authentication';
import { createStyle } from '../../styles';
import { getFormattedTime, getAlertColor} from '../../utils';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { createTheme } from '../../themes';

export const EventWidget = ({ task, remove, edit }) => {
  const { colorScheme } = useContext(AuthContext);
  const Theme = createTheme(colorScheme);
  const styles = createStyle('eventWidget', colorScheme);
  const color = getAlertColor(task.alert);
  const isEditable = !task.all_day;
  const start = getFormattedTime(task.hour, task.min);

  const handleDelete = () => remove(task);

  const handleEdit = () => edit(task);

  return (
    <View style={styles.container}>
      <Text style={[styles.start, styles.text]}>
        {start}
      </Text>

      <Text style={[styles.title, styles.text]}>
        {task.title}
      </Text>

      <View style={{ position: 'absolute', right: 10, top: 10}}>
        {color && <Ionicons name="alert-circle" size={20} color={color} />}
      </View>

      {
        isEditable &&
        <View style={[styles.flexContainer, styles.buttons]}>
          <TouchableOpacity onPress={handleDelete}>
            <FontAwesome name="trash-o" size={30} color={Theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEdit}>
            <MaterialCommunityIcons name="pencil" size={30} color={Theme.colors.text} />
          </TouchableOpacity>
        </View>
      }
    </View>
  )
}