import { StyleSheet } from 'react-native';
import { createTheme } from '../themes';

export const scheduleStyle = (colorScheme = 'light') => {
  const Theme = createTheme(colorScheme);
  return StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: Theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        //borderRadius: 50,
        //position: 'absolute',
        //bottom: 10,
        //right: 20,
    },
    buttonText: {
      color: Theme.colors.text,
      paddingHorizontal: 4
    },
  });
};
