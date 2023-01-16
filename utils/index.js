import { format } from 'date-fns';
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

const formatDate = (date = new Date()) => format(date, 'yyyy-MM-dd');

const getFormattedTime = (hour, minutes) => {
  const hr = hour > 12 ?  hour - 12 : hour === 0 ? 12 : hour;
  const amPm = hour < 12 ? 'am' : 'pm';
  const min = `${minutes}`.padStart(2, '0');
  return `${hr}:${min}${amPm}`;
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
  if (m >= 45) return 45;
  if (m >= 30) return 30;
  if (m >= 20) return 20;
  if (m >= 15) return 15;
  return 0;
};

const normalizeDate = (h, m) => {
  const d = new Date();
  d.setHours(h);
  d.setMinutes(normalizeMin(m));
  return d;
};

export {
  getAlertColor,
  getFormattedTime,
  getDaysOfWeek,
  isWeekEnd,
  formatDate,
  normalizeMin,
  normalizeDate,
};
