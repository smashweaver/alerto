import { addMinutes, format, parseISO } from 'date-fns';
import getDaysOfWeek from './getDaysOfWeek';

const getAlertColor = (alert) => {
  switch (alert) {
    case 1:
      return 'green';
    case 2:
      return 'yellow';
    case 3:
      return 'red';
    default:
      return '';
  }
};

const dayOfWeek = (dateString = '2023-04-12') => {
  const date = parseISO(dateString);
  return format(date, 'eee').toLowerCase();
};

const formatDate = (date = new Date()) => format(date, 'yyyy-MM-dd');

const formatDateTime = (date = new Date()) => format(date, 'P p');

const getFormattedTime = (hour, minutes) => {
  const hr = hour > 12 ?  hour - 12 : hour === 0 ? 12 : hour;
  const amPm = hour < 12 ? 'am' : 'pm';
  const min = `${minutes}`.padStart(2, '0');
  return `${hr}:${min}${amPm}`;
};

const getFormattedEndTime = (start, duration) => {
  const st = new Date(new Date().setHours(0,start,0,0));
  const d = addMinutes(st, duration)
  return getFormattedTime(d.getHours(), d.getMinutes());
};

const isWeekEnd = (dd) => {
  try {
    const day = new Date(dd).getDay();
    return day === 0 || day === 6;
  } catch (err) {
    return false;
  }
};

const normalizeMin = (m) => {
  return m - (m % 5);
};

const normalizeDate = (h, m) => {
  const d = new Date();
  d.setHours(h);
  d.setMinutes(normalizeMin(m));
  return d;
};

const calcStart = (activity, data = {}) => {
  const hour = ('hour' in data) ? data.hour : activity.hour;
  const min = ('min' in data) ? data.min : activity.min;
  return hour * 60 + min;
};

const dayToStringMap = new Map([
  [1, 'mon'],
  [2, 'tue'],
  [3, 'wed'],
  [4, 'thu'],
  [5, 'fri'],
  [6, 'sat'],
  [0, 'sun']
]);

const dayToString = (day) => dayToStringMap.get(day);

const canOccure = (date, occurence) => {
  const map = new Map(Object.entries({...occurence}));
  const day = dayToString(new Date(date).getDay());
  const v =  map.get(day);
  //console.log({ v, date, day, occurence});
  return v;
};

export {
  getAlertColor,
  getFormattedTime,
  getDaysOfWeek,
  isWeekEnd,
  formatDate,
  normalizeMin,
  normalizeDate,
  calcStart,
  getFormattedEndTime,
  dayToString,
  canOccure,
  dayOfWeek,
  formatDateTime,
};
