import React, { useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/Authentication';
import { createStyle } from '../../styles';
import { getFormattedTime, getAlertColor} from '../../utils';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { createTheme } from '../../themes';

export const EventWidget = ({ task }) => {
  const { colorScheme } = useContext(AuthContext);
  const Theme = createTheme(colorScheme);
  const styles = createStyle('eventWidget', colorScheme);
  const color = useMemo(() => getAlertColor(task.alert), [task.alert]);

  return (
    <View style={styles.container}>
      <Text style={[styles.start, styles.text]}>{getFormattedTime(task.hour, task.min)}</Text>
      <Text style={[styles.title, styles.text]}>{task.title}</Text>

      <View style={{ position: 'absolute', right: 10, top: 10}}>
        {color && <Ionicons name="alert-circle" size={30} color={color} />}
      </View>

      <View style={[styles.flexContainer, styles.buttons]}>
        <TouchableOpacity>
          <FontAwesome name="trash-o" size={24} color={Theme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity>
        <MaterialCommunityIcons name="pencil" size={24} color={Theme.colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  )
}