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
  console.log({ hour, minutes });
  const hr = hour > 12 ?  hour - 12 : hour === 0 ? 12 : hour;
  const amPm = hour < 12 ? 'am' : 'pm';
  const min = `${minutes}`.padStart(2, '0');
  return `${hr}:${min}${amPm}`;
};

export {
  getAlertColor,
  getFormattedTime,
  getDaysOfWeek
};
