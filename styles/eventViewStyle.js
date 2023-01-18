import { StyleSheet } from 'react-native';
import { createTheme } from '../themes';

export const eventViewStyle = (colorScheme = 'light') => {
  const Theme = createTheme(colorScheme);
  return StyleSheet.create({
    active: {
      borderColor: Theme.CardBorderColor,
      borderWidth: 2,
    },
    normal: {
    },
    flexContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignContext: 'center',
      justifyContent: 'space-between',
    },
    cardContainer: {
      backgroundColor: Theme.CardBackgroundColor,
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
      minHeight: 140,
    },
    text: {
      fontSize: 18,
      fontWeight: '500',
      color: Theme.CardTextColor,
    },
    titleText: {
      fontSize: 32
    },
    cardShadow: {
      shadowColor: Theme.ShadowColor,
      elevation: 1,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    }
  });
};
