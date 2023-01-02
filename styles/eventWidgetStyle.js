import { StyleSheet } from 'react-native';
import { createTheme } from '../themes';

export const eventWidgetStyle = (colorScheme = 'light') => {
  const Theme = createTheme(colorScheme);
  return StyleSheet.create({
    container: {
      marginBottom: 10,
      marginHorizontal: 10,
      padding: 10,
      backgroundColor: Theme.CardBackgroundColor,
      borderRadius: 8,
      //minHeight: 150,
    },
    flexContainer: {
      flex: 1,
      flexDirection: 'row',
      alignContext: 'center',
      justifyContent: 'space-between',
      paddingTop: 8,
    },
    buttons: {
      marginTop: 16,
      borderTopWidth: 1,
    },
    text: {
      color: Theme.CardTextColor,
    },
    start: {
      fontWeight: '700',
      fontSize: 16
    },
    title: {
      fontSize: 24
    }
  });
};
