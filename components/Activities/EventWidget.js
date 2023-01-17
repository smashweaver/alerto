import React, { useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AppContext } from '../../contexts/appContext';
import { createStyle } from '../../styles';
import { getFormattedTime, getAlertColor} from '../../utils';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { createTheme } from '../../themes';
import { Switch, IconButton } from 'react-native-paper';

export const EventWidget = ({ task, remove, edit }) => {
  const { colorScheme } = useContext(AppContext);
  const Theme = createTheme(colorScheme);
  const styles = createStyle('eventWidget', colorScheme);
  const color = getAlertColor(task.alert);
  const isEditable = !task.all_day;
  const start = getFormattedTime(task.hour, task.min);

  const handleDelete = () => remove(task);

  const handleEdit = () => edit(task);

  return (
    <View style={styles.container}>
      <View style={[styles.flexContainer, { justifyContent:'flex-start' }]}>
        {color && <Ionicons name="alert-circle" size={20} color={color} style={{marginRight: 4}} />}
        <Text style={[styles.start, styles.text]}>
          {start} - {task.duration} min
        </Text>
      </View>

      <Text style={[styles.title, styles.text]}>
        {task.title}
      </Text>


      {
        isEditable &&
        <View style={[styles.flexContainer, styles.actionGroup,  { paddingHorizontal:4, marginTop:24 }]}>
          <IconButton iconColor={Theme.colors.text} containerColor={Theme.colors.primary} size={16}  icon="delete-outline" mode="contained" onPress={handleDelete} />
          <IconButton  iconColor={Theme.colors.text} containerColor={Theme.colors.primary} size={16} icon="pencil" mode="contained" onPress={handleEdit} />
        </View>
      }
    </View>
  )
}
