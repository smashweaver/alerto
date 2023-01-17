import React, { useContext, useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppContext } from '../../contexts/appContext';
import { createStyle } from '../../styles';
import { getFormattedTime, getAlertColor} from '../../utils';
import { Ionicons } from '@expo/vector-icons';
import { createTheme } from '../../themes';
import { Switch, IconButton } from 'react-native-paper';


export const EventWidget = ({ task, remove, edit }) => {
  const { colorScheme } = useContext(AppContext);
  const Theme = createTheme(colorScheme);
  const styles = createStyle('eventWidget', colorScheme);
  const color = getAlertColor(task.alert);
  const isDeletable = task.custom;
  const start = getFormattedTime(task.hour, task.min);
  const [disabled, setDisabled] = useState(!!task.disabled)

  const statusText = useMemo(() => disabled ? 'Disabled' : 'Enabled', [disabled]);

  const handleDelete = () => remove(task);
  const handleEdit = () => edit(task);
  const toggleDisabled = () => {
    setDisabled(prev => !prev);
  };

  useEffect(() => {
    console.log({ disabled });
    task.disabled = disabled;
  }, [disabled]);

  const paddingVertical = Platform.OS === 'ios' ? 5 : 0;
  const paddingHorizontal = 10;

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

      <View style={{ position: 'absolute', right: 10, top: 10}}>

      </View>

      <View style={[styles.actionGroup, styles.flexContainer, styles.actionGroup, { paddingHorizontal, paddingVertical,  marginVertical: 10 }]}>
        <Text style={{color: Theme.colors.text}}>{statusText}</Text>
        <Switch color={Theme.colors.primary}  value={!disabled} onValueChange={toggleDisabled} />
      </View>

      <View style={[styles.flexContainer, styles.actionGroup, { paddingHorizontal:4 }]}>
        <IconButton iconColor={Theme.colors.text} containerColor={Theme.colors.primary} size={16}  icon="delete-outline" mode="contained" onPress={handleDelete} />
        <IconButton  iconColor={Theme.colors.text} containerColor={Theme.colors.primary} size={16} icon="pencil" mode="contained" onPress={handleEdit} />
      </View>
    </View>
  )
}
