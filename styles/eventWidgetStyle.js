import { StyleSheet } from 'react-native';
import { createTheme } from '../themes';

export const eventWidgetStyle = (colorScheme = 'light') => {
  const Theme = createTheme(colorScheme);
  return StyleSheet.create({
    container: {
      marginBottom: 1,
      padding: 10,
      backgroundColor: Theme.CardBackgroundColor,
    },
    flex: {
      display: 'flex',
      flexDirection: 'row',
      alignContext: 'center',
      justifyContent: 'space-between',
      alignItems:'center',
    },
    text: {
      color: Theme.CardTextColor,
    },
    start: {
      //fontWeight: '700',
      fontSize: 14
    },
    title: {
      fontSize: 20
    },
  });
};
