import { CustomDarkTheme } from './CustomDarkTheme';
import { CustomLightTheme } from './CustomLightTheme';

export function createTheme(scheme = 'light') {
  // if (scheme == 'light') return CustomLightTheme
  return CustomDarkTheme;
}
