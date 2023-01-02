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

export {
  getAlertColor,
  getFormattedTime,
  getDaysOfWeek,
  isWeekEnd,
};
