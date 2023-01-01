import { authStyle } from './authStyle';
import { drawerStyle } from './drawerStyle';
import { scheduleStyle } from './scheduleStyle.js';
import { dateWidgetStyle } from './dateWidgetStyle';
import { eventViewStyle } from './eventViewStyle';

function createStyle(name = '', colorScheme = 'light') {
  if ('drawerContent' === name) return drawerStyle(colorScheme);
  if ('schedule' === name) return scheduleStyle(colorScheme);
  if ('dateWidget' === name) return dateWidgetStyle(colorScheme);
  if ('eventViewStyle' === name) return eventViewStyle(colorScheme);
  return authStyle(colorScheme);
}

export { createStyle };
