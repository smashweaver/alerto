import { StyleSheet } from 'react-native';
import { createTheme } from '../themes';

export const drawerStyle = (colorScheme = 'light') => {
  const Theme = createTheme(colorScheme);
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Theme.colors.background,
    },
    scroll: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 20,
      marginBottom: 20,
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 30
    },
    button: {
      margin: 20,
      padding: 10,
      borderRadius: 4 ,
      backgroundColor: Theme.ButtonBackgroundColor,
    },
    buttonText: {
      color: Theme.ButtonTextColor,
    },
    text: {
      color: Theme.LinkColor,
    },
    linkContainer: {
      marginBottom: 16,
      marginHorizontal: 20,
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
    },
    linkText: {
      fontSize: 24,
      fontWeight: '500',
      color: Theme.LinkColor,
      marginLeft: 10,
      textDecorationLine: 'underline',
    }
  });
};
