import { DefaultTheme } from '@react-navigation/native';
console.log({...DefaultTheme});

export const CustomLightTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: '#E5DBFF',
  },
  HeaderBackgroundColor: '#7048E8',
  HeaderTintColor: '#F8F9FA',
  ContainerBackgroundColor: '#E5DBFF',

  /** error */
  ErrorMessageBackgroundColor: '#C92A2A',
  ErrorMessageTextColor: '#FFFF',

  /** labeled text inputs */
  TextInputPromptColor: '#5F3DC4',
  TextInputBorderColor: '#5F3DC4',
  TextInputColor: '#5F3DC4',
  TextInputBackgroundColor: 'transparent',

  /** buttons */
  ButtonBackgroundColor: '#845ef7',
  ButtonTextColor: '#FFF',

  /** drawer content */
  DrawerContentBackgroundColor: '#E5DBFF',
  LinkColor: '#000',

  /** tab */
  TabBackgroundColor: '#D0BFFF',

  /** screen content */
  PrimaryBackgroundColor: '#FFF',
  PrimaryColor: '#000',
  ShadowColor: '#000',
  CardBackgroundColor: '#D0BFFF',
  CardBorderColor: '#9775FA',
  CardTextColor: '#000',
};
