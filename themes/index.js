import { CustomDarkTheme } from './CustomDarkTheme';
import { CustomLightTheme } from './CustomLightTheme';

export function createTheme(scheme = 'dark') {
  if (scheme == 'dark') return CustomDarkTheme;
  return CustomLightTheme;
}
