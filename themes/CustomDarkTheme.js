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
  LinkColor: '#FFF',

  /** tab */
  TabBackgroundColor: '#101113',

  /** screen content */
  PrimaryBackgroundColor: '#DEE2E6',
  PrimaryColor: '#000',
  ShadowColor: '#ADB5BD',
  CardBackgroundColor: '#495057',
  CardBorderColor: '#C1C2C5',
  CardTextColor: '#FFF',
  DangerColor: 'red',
  SelectedBackgroundColor: '#495057',
  ModalHeaderTextColor: '#A6A7AB',
};
