const WeekdayOccurrence = {
  mon: true,
  tue: true,
  wed: true,
  thu: true,
  fri: true,
  sat: false,
  sun: false,
};

const WeekendOccurrence = {
  mon: false,
  tue: false,
  wed: false,
  thu: false,
  fri: false,
  sat: true,
  sun: true,
};

/*
The ideal bear schedule looks like:
    7–8 a.m.: Wake up
    10 a.m.–2 p.m.: Focus on deep work
    2–4 p.m.: Work on lighter tasks
    4–10 p.m.: Relax and unwind
    10–11 p.m.: Get ready for bed
    11 p.m.–7 a.m.: Sleep
*/
const bear = [
  {
    hour: 7,        // 7am
    min: 0,
    duration: 60,   // 1 hour
    title: 'Wake up',
    alert: 3,
    note: 'Wake up',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 10,       // 10am
    min: 0,
    duration: 240,  // 4 hours
    title: 'Deep Work',
    alert: 3,
    note: 'Focus on deep work',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 14,       // 2pm
    min: 0,
    duration: 120,  // 2 hours
    title: 'Light Work',
    alert: 3,
    note: 'Work on lighter tasks',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 16,       // 4pm
    min: 0,
    duration: 360,  // 6 hours
    title: 'Relax',
    alert: 3,
    note: 'Relax and unwind',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 22,       // 10pm
    min: 0,
    duration: 60,   // 1 hour
    title: 'Get ready for bed',
    alert: 3,
    note: 'Get ready for bed',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 23,       // 11pm
    min: 0,
    duration: 480,  // 8 hours
    title: 'Sleep',
    alert: 3,
    note: 'Sleep',
    occurence: WeekdayOccurrence,
  },
];

/*
The best schedule for a wolf is:

    7:30–9 a.m.: Wake up
    10 a.m.–12 p.m.: Focus on lighter tasks
    12–2 p.m.: Complete deep or creative work
    2–5 p.m.: Focus on lighter, less intense tasks
    5–9 p.m.: Engage in creative tasks
    9–10 p.m.: Unwind from the day
    10 p.m.–12 a.m.: Prepare for bed
    12–7:30 a.m.: Sleep
*/
const wolf = [
  {
    hour: 7,        // 7am
    min: 30,
    duration: 90,   // 1.5 hours
    title: 'Wake up',
    alert: 3,
    note: 'Wake up',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 10,       // 10am
    min: 0,
    duration: 120,  // 2 hours
    title: 'Light Work',
    alert: 3,
    note: 'Focus on lighter tasks',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 12,       // 12pm
    min: 0,
    duration: 120,  // 2 hours
    title: 'Deep Work',
    alert: 3,
    note: 'Complete deep or creative work',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 14,       // 2pm
    min: 0,
    duration: 180,  // 3 hours
    title: 'Light Work',
    alert: 3,
    note: 'Focus on lighter, less intense tasks',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 17,       // 5pm
    min: 0,
    duration: 240,  // 4 hours
    title: 'Creative Work',
    alert: 3,
    note: 'Engage in creative tasks',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 21,       // 9pm
    min: 0,
    duration: 60,   // 1 hour
    title: 'Unwind',
    alert: 3,
    note: 'Unwind from the day',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 22,       // 10pm
    min: 0,
    duration: 120,  // 2 hours
    title: 'Get ready for bed',
    alert: 3,
    note: 'Get ready for bed',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 0,        // 12am
    min: 0,
    duration: 450,  // 7.5 hours
    title: 'Sleep',
    alert: 3,
    note: 'Sleep',
    occurence: WeekdayOccurrence,
  },
];

/*
The ideal daily schedule for a lion looks like:

    6–7 a.m.: Wake up
    8 a.m.–12 p.m.: Focus on deep work
    12–4 p.m.: Focus on lighter tasks
    4–9 p.m.: Daily unwind and relax
    9–10 p.m.: Get ready for bed
    10 p.m. – 6 a.m.: Sleep
*/
const lion = [
  {
    hour: 6,        // 6am
    min: 0,
    duration: 60,   // 1 hour
    title: 'Wake up',
    alert: 3,
    note: 'Wake up',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 8,        // 8am
    min: 0,
    duration: 240,  // 4 hours
    title: 'Deep Work',
    alert: 3,
    note: 'Focus on deep work',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 12,       // 12pm
    min: 0,
    duration: 240,  // 4 hours
    title: 'Light Work',
    alert: 3,
    note: 'Focus on lighter tasks',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 16,       // 4pm
    min: 0,
    duration: 300,  // 5 hours
    title: 'Relax',
    alert: 3,
    note: 'Daily unwind and relax',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 21,       // 9pm
    min: 0,
    duration: 60,   // 1 hour
    title: 'Get ready for bed',
    alert: 3,
    note: 'Get ready for bed',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 22,       // 10pm
    min: 0,
    duration: 480,  // 8 hours
    title: 'Sleep',
    alert: 3,
    note: 'Sleep',
    occurence: WeekdayOccurrence,
  },
];

/*
The ideal schedule for a dolphin looks like:

    6:30–7:30 a.m.: Wake up
    8–10 a.m.: Engage with easy to-dos
    10 a.m.–12 p.m.: Focus on demanding tasks
    12–4 p.m.: Complete less demanding tasks
    4–10 p.m.: Relax, unwind from the day
    10–11:30 p.m.: Prepare for bed
    12–6:30 a.m.: Sleep
*/
const dolphin = [
  {
    hour: 6,        // 6am
    min: 30,
    duration: 60,   // 1 hour
    title: 'Wake up',
    alert: 3,
    note: 'Wake up',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 8,        // 8am
    min: 0,
    duration: 120,  // 2 hours
    title: 'Easy To-Dos',
    alert: 3,
    note: 'Engage with easy to-dos',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 10,       // 10am
    min: 0,
    duration: 120,  // 2 hours
    title: 'Demanding Tasks',
    alert: 3,
    note: 'Focus on demanding tasks',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 12,       // 12pm
    min: 0,
    duration: 240,  // 4 hours
    title: 'Less Demanding Tasks',
    alert: 3,
    note: 'Complete less demanding tasks',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 16,       // 4pm
    min: 0,
    duration: 360,  // 6 hours
    title: 'Relax',
    alert: 3,
    note: 'Relax, unwind from the day',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 22,       // 10pm
    min: 0,
    duration: 90,   // 1.5 hours
    title: 'Get ready for bed',
    alert: 3,
    note: 'Prepare for bed',
    occurence: WeekdayOccurrence,
  },
  {
    hour: 0,       // 12am
    min: 0,
    duration: 390,  // 6.5 hours
    title: 'Sleep',
    alert: 3,
    note: 'Sleep',
    occurence: WeekdayOccurrence,
  },
];

/*
Weekend Schedule for "Bear" Chronotype:
    8-9 a.m.: Wake up
    9-10 a.m.: Enjoy a leisurely breakfast
    10 a.m.-12 p.m.: Engage in physical activities (exercise, outdoor activities, etc.)
    12-1 p.m.: Lunch
    1-4 p.m.: Pursue hobbies or personal interests (painting, playing an instrument, gardening, etc.)
    4-6 p.m.: Relax and unwind (read a book, listen to music, take a nap, etc.)
    6-8 p.m.: Socialize with friends or family (have dinner together, play games, engage in meaningful conversations, etc.)
    8-9 p.m.: Prepare for bedtime routine (wind down, practice relaxation techniques)
    9-10 p.m.: Get ready for bed
    10 p.m.-8 a.m.: Sleep
*/
const bearWeekend = [
  {
    hour: 8,        // 8am
    min: 0,
    duration: 60,   // 1 hour
    title: 'Wake up',
    alert: 3,
    note: 'Wake up',
    occurence: WeekendOccurrence,
  },
  {
    hour: 9,        // 9am
    min: 0,
    duration: 60,   // 1 hour
    title: 'Breakfast',
    alert: 3,
    note: 'Enjoy a leisurely breakfast',
    occurence: WeekendOccurrence,
  },
  {
    hour: 10,       // 10am
    min: 0,
    duration: 120,  // 2 hours
    title: 'Physical Activities',
    alert: 3,
    note: 'Engage in physical activities (exercise, outdoor activities, etc.)',
    occurence: WeekendOccurrence,
  },
  {
    hour: 12,       // 12pm
    min: 0,
    duration: 60,   // 1 hour
    title: 'Lunch',
    alert: 3,
    note: 'Lunch',
    occurence: WeekendOccurrence,
  },
  {
    hour: 13,       // 1pm
    min: 0,
    duration: 180,  // 3 hours
    title: 'Hobbies',
    alert: 3,
    note: 'Pursue hobbies or personal interests (painting, playing an instrument, gardening, etc.)',
    occurence: WeekendOccurrence,
  },
  {
    hour: 16,       // 4pm
    min: 0,
    duration: 120,  // 2 hours
    title: 'Relax',
    alert: 3,
    note: 'Relax and unwind (read a book, listen to music, take a nap, etc.)',
    occurence: WeekendOccurrence,
  },
  {
    hour: 18,       // 6pm
    min: 0,
    duration: 120,  // 2 hours
    title: 'Socialize',
    alert: 3,
    note: 'Socialize with friends or family (have dinner together, play games, engage in meaningful conversations, etc.)',
    occurence: WeekendOccurrence,
  },
  {
    hour: 20,       // 8pm
    min: 0,
    duration: 60,   // 1 hour
    title: 'Bedtime Routine',
    alert: 3,
    note: 'Prepare for bedtime routine (wind down, practice relaxation techniques)',
    occurence: WeekendOccurrence,
  },
  {
    hour: 21,       // 9pm
    min: 0,
    duration: 60,   // 1 hour
    title: 'Get ready for bed',
    alert: 3,
    note: 'Get ready for bed',
    occurence: WeekendOccurrence,
  },
  {
    hour: 22,       // 10pm
    min: 0,
    duration: 480,  // 8 hours
    title: 'Sleep',
    alert: 3,
    note: 'Sleep',
    occurence: WeekendOccurrence,
  },
];

/*
Weekend Schedule for "Wolf" Chronotype:
    7:30-9 a.m.: Wake up
    9-10 a.m.: Morning routine and self-care
    10 a.m.-12 p.m.: Engage in creative activities (writing, painting, playing music, etc.)
    12-1 p.m.: Lunch break
    1-4 p.m.: Focus on leisure and enjoyable activities (reading, hobbies, spending time outdoors, etc.)
    4-5 p.m.: Break time (go for a walk, stretch, etc.)
    5-8 p.m.: Free time for relaxation, socializing, or pursuing personal interests
    8-9 p.m.: Unwind from the day (meditate, listen to calming music, practice self-care, etc.)
    9-10 p.m.: Prepare for bed (establish a bedtime routine)
    10 p.m.-12 a.m.: Wind down and relax before sleep
    12-7:30 a.m.: Sleep
*/
const wolfWeekend = [
  {
    hour: 7,        // 7am
    min: 30,
    duration: 90,   // 1.5 hours
    title: 'Wake up',
    alert: 3,
    note: 'Wake up',
    occurence: WeekendOccurrence,
  },
  {
    hour: 9,        // 9am
    min: 0,
    duration: 60,   // 1 hour
    title: 'Morning Routine',
    alert: 3,
    note: 'Morning routine and self-care',
    occurence: WeekendOccurrence,
  },
  {
    hour: 10,       // 10am
    min: 0,
    duration: 120,  // 2 hours
    title: 'Creative Activities',
    alert: 3,
    note: 'Engage in creative activities (writing, painting, playing music, etc.)',
    occurence: WeekendOccurrence,
  },
  {
    hour: 12,       // 12pm
    min: 0,
    duration: 60,   // 1 hour
    title: 'Lunch',
    alert: 3,
    note: 'Lunch break',
    occurence: WeekendOccurrence,
  },
  {
    hour: 13,       // 1pm
    min: 0,
    duration: 180,  // 3 hours
    title: 'Leisure Activities',
    alert: 3,
    note: 'Focus on leisure and enjoyable activities (reading, hobbies, spending time outdoors, etc.)',
    occurence: WeekendOccurrence,
  },
  {
    hour: 16,       // 4pm
    min: 0,
    duration: 60,   // 1 hour
    title: 'Break',
    alert: 3,
    note: 'Break time (go for a walk, stretch, etc.)',
    occurence: WeekendOccurrence,
  },
  {
    hour: 17,       // 5pm
    min: 0,
    duration: 180,  // 3 hours
    title: 'Free Time',
    alert: 3,
    note: 'Free time for relaxation, socializing, or pursuing personal interests',
    occurence: WeekendOccurrence,
  },
  {
    hour: 20,       // 8pm
    min: 0,
    duration: 60,   // 1 hour
    title: 'Unwind',
    alert: 3,
    note: 'Unwind from the day (meditate, listen to calming music, practice self-care, etc.)',
    occurence: WeekendOccurrence,
  },
  {
    hour: 21,       // 9pm
    min: 0,
    duration: 60,   // 1 hour
    title: 'Bedtime Routine',
    alert: 3,
    note: 'Prepare for bed (establish a bedtime routine)',
    occurence: WeekendOccurrence,
  },
  {
    hour: 22,       // 10pm
    min: 0,
    duration: 120,  // 2 hours
    title: 'Wind Down',
    alert: 3,
    note: 'Wind down and relax before sleep',
    occurence: WeekendOccurrence,
  },
  {
    hour: 0,        // 12am
    min: 0,
    duration: 450,  // 7.5 hours
    title: 'Sleep',
    alert: 3,
    note: 'Sleep',
    occurence: WeekendOccurrence,
  },
];

/*
Weekend Schedule for "Lion" Chronotype:
    6-7 a.m.: Wake up
    7-8 a.m.: Morning routine and self-care
    8 a.m.-12 p.m.: Engage in activities that bring you joy and relaxation (exercise, hobbies, reading, etc.)
    12-1 p.m.: Lunch break
    1-4 p.m.: Pursue leisure activities or spend time outdoors
    4-9 p.m.: Daily unwind and relax (socialize, spend time with loved ones, engage in hobbies, etc.)
    9-10 p.m.: Get ready for bed
    10 p.m. - 6 a.m.: Sleep
*/
const lionWeekend = [
  {
    hour: 6,        // 6am
    min: 0,
    duration: 60,   // 1 hour
    title: 'Wake up',
    alert: 3,
    note: 'Wake up',
    occurence: WeekendOccurrence,
  },
  {
    hour: 7,        // 7am
    min: 0,
    duration: 60,   // 1 hour
    title: 'Morning Routine',
    alert: 3,
    note: 'Morning routine and self-care',
    occurence: WeekendOccurrence,
  },
  {
    hour: 8,        // 8am
    min: 0,
    duration: 240,  // 4 hours
    title: 'Joy and Relaxation',
    alert: 3,
    note: 'Engage in activities that bring you joy and relaxation (exercise, hobbies, reading, etc.)',
    occurence: WeekendOccurrence,
  },
  {
    hour: 12,       // 12pm
    min: 0,
    duration: 60,   // 1 hour
    title: 'Lunch',
    alert: 3,
    note: 'Lunch break',
    occurence: WeekendOccurrence,
  },
  {
    hour: 13,       // 1pm
    min: 0,
    duration: 180,  // 3 hours
    title: 'Leisure Activities',
    alert: 3,
    note: 'Pursue leisure activities or spend time outdoors',
    occurence: WeekendOccurrence,
  },
  {
    hour: 16,       // 4pm
    min: 0,
    duration: 300,  // 5 hours
    title: 'Relax',
    alert: 3,
    note: 'Daily unwind and relax (socialize, spend time with loved ones, engage in hobbies, etc.)',
    occurence: WeekendOccurrence,
  },
  {
    hour: 21,       // 9pm
    min: 0,
    duration: 60,   // 1 hour
    title: 'Get ready for bed',
    alert: 3,
    note: 'Get ready for bed',
    occurence: WeekendOccurrence,
  },
  {
    hour: 22,       // 10pm
    min: 0,
    duration: 480,  // 8 hours
    title: 'Sleep',
    alert: 3,
    note: 'Sleep',
    occurence: WeekendOccurrence,
  },
];

/*
Weekend Schedule for "Dolphin" Chronotype:
    6:30-7:30 a.m.: Wake up
    7:30-8 a.m.: Morning routine and self-care
    8-10 a.m.: Engage with easy to-dos or light tasks (personal errands, organizing, etc.)
    10 a.m.-12 p.m.: Focus on activities that bring you joy or relaxation (reading, hobbies, creative pursuits, etc.)
    12-1 p.m.: Lunch break
    1-4 p.m.: Complete less demanding tasks or engage in enjoyable activities (spending time outdoors, pursuing interests, etc.)
    4-10 p.m.: Relax, unwind from the day (read, practice relaxation techniques, engage in hobbies, etc.)
    10-11:30 p.m.: Prepare for bed (establish a bedtime routine)
    11:30 p.m.-6:30 a.m.: Sleep
*/
const dolphinWeekend = [
  {
    hour: 6,        // 6am
    min: 30,
    duration: 60,   // 1 hour
    title: 'Wake up',
    alert: 3,
    note: 'Wake up',
    occurence: WeekendOccurrence,
  },
  {
    hour: 7,        // 7am
    min: 30,
    duration: 30,   // 0.5 hour
    title: 'Morning Routine',
    alert: 3,
    note: 'Morning routine and self-care',
    occurence: WeekendOccurrence,
  },
  {
    hour: 8,        // 8am
    min: 0,
    duration: 120,  // 2 hours
    title: 'Easy To-Dos',
    alert: 3,
    note: 'Engage with easy to-dos or light tasks (personal errands, organizing, etc.)',
    occurence: WeekendOccurrence,
  },
  {
    hour: 10,       // 10am
    min: 0,
    duration: 120,  // 2 hours
    title: 'Joy and Relaxation',
    alert: 3,
    note: 'Focus on activities that bring you joy or relaxation (reading, hobbies, creative pursuits, etc.)',
    occurence: WeekendOccurrence,
  },
  {
    hour: 12,       // 12pm
    min: 0,
    duration: 60,   // 1 hour
    title: 'Lunch',
    alert: 3,
    note: 'Lunch break',
    occurence: WeekendOccurrence,
  },
  {
    hour: 13,       // 1pm
    min: 0,
    duration: 180,  // 3 hours
    title: 'Less Demanding Tasks',
    alert: 3,
    note: 'Complete less demanding tasks or engage in enjoyable activities (spending time outdoors, pursuing interests, etc.)',
    occurence: WeekendOccurrence,
  },
  {
    hour: 16,       // 4pm
    min: 0,
    duration: 360,  // 6 hours
    title: 'Relax',
    alert: 3,
    note: 'Relax, unwind from the day (read, practice relaxation techniques, engage in hobbies, etc.)',
    occurence: WeekendOccurrence,
  },
  {
    hour: 22,       // 10pm
    min: 0,
    duration: 90,   // 1.5 hours
    title: 'Bedtime Routine',
    alert: 3,
    note: 'Prepare for bed (establish a bedtime routine)',
    occurence: WeekendOccurrence,
  },
  {
    hour: 23,       // 11pm
    min: 30,
    duration: 420,  // 7 hours
    title: 'Sleep',
    alert: 3,
    note: 'Sleep',
    occurence: WeekendOccurrence,
  },
];


export const chronotypeToEventsMap = {
  'bear': [...bear, ...bearWeekend],
  'wolf': [...wolf, ...wolfWeekend],
  'lion': [...lion, ...lionWeekend],
  'dolphin': [...dolphin, ...dolphinWeekend],
};
