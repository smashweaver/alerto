import { startOfWeek, addDays } from 'date-fns';

const getDaysOfWeek = (now) => {
  const start = startOfWeek(now, { weekStartsOn: 0 });
  const days = [start];
  for(let i=1; i<7; i++) {
    days.push(addDays(start, i));
  }
  return days;
};

export default getDaysOfWeek;
