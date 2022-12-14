const firebaseConfig = {
  apiKey: "AIzaSyAoMRa4dyrX5lz4QebGX0xLCcnTTTAt7no",
  authDomain: "capstone-mcm.firebaseapp.com",
  projectId: "capstone-mcm",
  storageBucket: "capstone-mcm.appspot.com",
  messagingSenderId: "592672261236",
  appId: "1:592672261236:web:3f643cffe4615aafc27d21"
};

const note = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus vel ligula eu eleifend. Etiam posuere lorem eget velit pellentesque blandit';

const template = [
    {
      start: 0,
      title: 'Sleep',
    },
    {
      start: 6,
      title: 'Freshen up',
      alert: 1,
      note,
    },
    {
      start: 7,
      title: 'Breakfast',
      alert: 2,
      note,
    },
    {
      start: 9,
      title: 'Sync Class',
      alert: 3,
      note,
    },
    {
      start: 10,
      title: 'Sync Class',
      alert: 3,
      note,
    },
    {
      start: 11,
      title: 'Sync Class',
      alert: 3,
      note,
    },
    {
      start: 12,
      title: 'Lunch',
      alert: 2,
      note,
    },
    {
      start: 13,
      title: 'Exercise',
      alert: 2,
      note,
    },
    {
      start: 14,
      title: 'Sync Class',
      alert: 3,
      note,
    },
    {
      start: 15,
      title: 'Sync Class',
      alert: 3,
      note,
    },
    {
      start: 17,
      title: 'Dinner',
    },
    {
      start: 18,
      title: 'Homework',
      alert: 2,
      note,
    },
    {
      start: 19,
      title: 'Free Time',
    },
    {
      start: 20,
      title: 'Homework',
      alert: 1,
      note,
    },
    {
      start: 21,
      title: 'Meditation',
      alert: 2,
      note,
    },
    {
      start: 22,
      title: 'Sleep',
      alert: 3,
      note,
    },
  ];

  export { firebaseConfig, template };
