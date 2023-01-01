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

const getFormattedTime = (start) => {
  const hour = start > 12 ?  start - 12 : start === 0 ? 12 : start;
  const amPm = start < 12 ? 'am' : 'pm';
  return `${hour}${amPm}`;
};

export {
  getAlertColor,
  getFormattedTime,
  getDaysOfWeek
};
