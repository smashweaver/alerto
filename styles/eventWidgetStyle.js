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
    flexContainer: {
      flex: 1,
      flexDirection: 'row',
      alignContext: 'center',
      justifyContent: 'space-between',
      alignItems:'center',
    },
    buttons: {
      marginTop: 10,
      //borderTopWidth: StyleSheet.hairlineWidth,
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
    actionGroup: {
      //borderColor: Theme.CardBorderColor,
      //borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 4,
      //marginTop: 10
      backgroundColor: '#343A40',
      height: 50
    },
    topBorder: {
      borderTopWidth: StyleSheet.hairlineWidth,
    },
    bordered: {
      borderWidth: StyleSheet.hairlineWidth,
      padding: 4,
      borderColor: Theme.colors.text
    }
  });
};
