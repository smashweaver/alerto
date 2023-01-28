const note = 'Recharge your batteries'

// This schedule is characterized by a single period of sleep, typically lasting around 8 hours, followed by a period of wakefulness during the day
const monoPhasic = [
  {
    hour: 20,           // 8pm
    min: 0,
    duration: 480,      // 7-9 hours
    title: 'Sleep',
    alert: 3,
    note,
  }
];

// This schedule consists of one long core sleep period at night, and a nap in the early afternoon for about 30 minutes to 2 hours
const biPhasic = [
  {
    hour: 0,        // 12am
    min: 0,
    duration: 360,  // 6 hours
    title: 'Sleep',
    alert: 3,
    note,
  },
  {
    hour: 14,     // 2pm
    min: 0,
    duration: 60, // 1-2 hours
    title: 'Nap',
    alert: 2,
    note,
  },
];

const polyPhasic = {
  // This schedule consists of one longer core sleep period of 3-4 hours at night, and three 20-minute naps throughout the day.
  everyman: [
    {
      hour: 0,        // 12am
      min: 0,
      duration: 240,  // 3-4 hours
      title: 'Sleep',
      alert: 3,
      note,
    },
    {
      hour: 10,      // 10am
      min: 0,
      duration: 20, // 20m
      title: 'Nap',
      alert: 2,
      note,
    },
    {
      hour: 14,      // 2pm
      min: 0,
      duration: 20, // 20m
      title: 'Nap',
      alert: 2,
      note,
    },
    {
      hour: 18,      // 6pm
      min: 0,
      duration: 20, // 20m
      title: 'Nap',
      alert: 2,
      note,
    },
  ],
  // This schedule consists of 20-minute naps every 4 hours, for a total of 6 naps per day.
  uberman: [
    {
      hour: 1,      // 1am
      min: 0,
      duration: 20, // 20m
      title: 'Nap',
      alert: 2,
      note,
    },
    {
      hour: 5,      // 5am
      min: 0,
      duration: 20, // 20m
      title: 'Nap',
      alert: 2,
      note,
    },
    {
      hour: 9,        // 9am
      min: 0,
      duration: 20,   // 20m
      title: 'Nap',
      alert: 2,
      note,
    },
    {
      hour: 13,       // 1pm
      min: 0,
      duration: 20,   // 20m
      title: 'Nap',
      alert: 2,
      note,
    },
    {
      hour: 17,       // 5pm
      min: 0,
      duration: 20,   // 20m
      title: 'Nap',
      alert: 2,
      note,
    },
    {
      hour: 21,     // 9pm
      min: 0,
      duration: 20,  // 20 minutes
      title: 'Nap',
      alert: 2,
      note,
    },
  ],
  // This schedule consists of four 30-minute naps taken every 6 hours, for a total of 4 naps per day
  dymaxion: [
    {
      hour: 1,      // 1am
      min: 0,
      duration: 30, // 30m
      title: 'Nap',
      alert: 2,
      note,
    },
    {
      hour: 7,      // 7am
      min: 0,
      duration: 30, // 30m
      title: 'Nap',
      alert: 2,
      note,
    },
    {
      hour: 13,     // 1pm
      min: 0,
      duration: 30, // 30m
      title: 'Nap',
      alert: 2,
      note,
    },
    {
      hour: 19,     // 7pm
      min: 0,
      duration: 30, // 30m
      title: 'Nap',
      alert: 2,
      note,
    },
  ],
};

const cycleToEventsMap = {
  mono: monoPhasic,
  bi: biPhasic,
  everyman: polyPhasic.everyman,
  uberman: polyPhasic.uberman,
  dymaxion: polyPhasic.dymaxion,
};

const cycleToNameMap = {
  mono: 'Monophasic',
  bi: 'Biphasic',
  everyman: 'Everyman',
  uberman: 'Uberman',
  dymaxion: 'Dymaxion',
};

export { cycleToEventsMap, cycleToNameMap };
