import { DarkTheme } from '@react-navigation/native';

export const CustomDarkTheme = {
  ...DarkTheme,
  dark: false,
  colors: {
    ...DarkTheme.colors,
    background: '#101113',
  },
  HeaderBackgroundColor: '#343A40',
  HeaderTintColor: '#F8F9FA',
  ContainerBackgroundColor: '#101113',

  /** error */
  ErrorMessageBackgroundColor: '#C92A2A',
  ErrorMessageTextColor: '#FFFF',

  /** labeled text inputs */
  TextInputPromptColor: '#C1C2C5',
  TextInputBorderColor: '#C1C2C5',
  TextInputColor: '#FFF',
  TextInputBackgroundColor: 'transparent',

  /** buttons */
  ButtonBackgroundColor: '#DEE2E6',
  ButtonTextColor: '#000',

  /** drawer content */
  DrawerContentBackgroundColor: '#101113',
  TextColor: '#FFF',

  /** tab */
  TabBackgroundColor: '#DEE2E6',

  /** screen content */
  PrimaryBackgroundColor: '#DEE2E6',
  PrimaryColor: '#000',
  ShadowColor: '#000',
  CardBackgroundColor: '#5C5F66',
  CardBorderColor: '#C1C2C5',
  CardTextColor: '#FFF'
};