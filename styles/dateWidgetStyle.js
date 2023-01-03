import { StyleSheet } from 'react-native';
import { createTheme } from '../themes';

export const dateWidgetStyle = (colorScheme = 'light') => {
  const Theme = createTheme(colorScheme);
  return StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    dow: {
      textAlign: 'center',
      marginBottom: 2,
      color: Theme.colors.text,
    },
    circle: {
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      width: 30,
      height: 30,
      paddingHorizontal: 8,
      paddingVertical: 6,
    },
    text: {
     fontSize: 12,
     color: Theme.colors.text,
    },
    current: {
      backgroundColor: Theme.SelectedBackgroundColor,
    },
    selected: {
      backgroundColor: Theme.colors.primary,
    },
  });
};
