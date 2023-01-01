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
      hour: 5,
      min: 0,
      title: 'Freshen up',
      alert: 1,
      note
    },
    {
      hour: 5,
      min: 30,
      title: 'Exercise',
      alert: 2,
      note
    },
    {
      hour: 6,
      min: 0,
      title: 'Eat',
      alert: 2,
      note
    },
    {
      hour: 11,
      min: 0,
      title: 'Eat',
      alert: 2,
      note,
    },
    {
      hour: 18,
      min: 0,
      title: 'Eat',
      alert: 2,
      note
    },
    {
      hour: 19,
      min: 0,
      title: 'Meditation',
      alert: 2,
      note
    },
    {
      hour: 19,
      min: 30,
      title: 'Freshen up',
      alert: 1,
      note
    },
    {
      hour: 20,
      min: 0,
      title: 'Sleep',
      alert: 3,
      note
    },
  ];

  export { firebaseConfig, template };
