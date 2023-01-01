import { StyleSheet } from 'react-native';
import { createTheme } from '../themes';

export const authStyle = (colorScheme = 'light') => {
  const Theme = createTheme(colorScheme);
  return StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: "center",
      paddingTop: '5%',
      paddingHorizontal: '10%',
      backgroundColor: Theme.colors.background,
    },
    button: {
      alignItems: "center",
      marginTop: 5,
      paddingVertical: 10,
      backgroundColor: Theme.ButtonBackgroundColor,
      borderRadius: 4,
    },
    buttonText: {
      color: Theme.ButtonTextColor,
    },
    prompt: {
      color: Theme.TextInputPromptColor,
      fontSize: 14,
      marginBottom: 4,
    },
    input: {
      height: 32,
      paddingHorizontal: 10,
      borderWidth: 1,
      backgroundColor: Theme.TextInputBackgroundColor,
      borderColor: Theme.TextInputBorderColor,
      color: Theme.TextInputColor,
      marginBottom: 10,
      fontSize: 18,
      height: 36,
      borderRadius: 3,
    },
    error: {
      backgroundColor: Theme.ErrorMessageBackgroundColor,
      borderRadius: 4,
      padding: 10,
      marginBottom: 10,
    },
    message: {
      color: Theme.ErrorMessageTextColor,
    }
  });
}
