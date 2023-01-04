import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore"

import { firebaseConfig, template } from '../constants';

// init firebase app
const app = initializeApp(firebaseConfig);
try {
  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (error) {
  console.log(`*** ${error.message}`);
};

// init services
const db = getFirestore(app);

const registerUser = async (email, password, name) => {
  const auth = getAuth();
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  auth.currentUser.displayName = name;
  await updateProfile(user, { displayName: name });
};

const signInUser = async (email, password) => {
  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
  } catch(error) {
    throw error;
  }
};

const signOutUser = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch(error) {
    console.log(error.message);
  }
};

const getEventsByDate = async (ownerId, date) => {
  const colRef = collection(db, 'events');
  const qryRef = query(colRef, where('owner_id', '==', ownerId),  where('date', '==', date));
  const snap = await getDocs(qryRef);
  if (!snap.empty) {
    const data = snap.docs.map(x => ({ ... x.data(), id: x.id }));
    //console.log('*** getEventsByDate', date, docs);
    return [...data];
  }
  return [];
};

const getEventsForNotification = async (ownerId, date, time) => {
  console.log('*** getEventsForNotification', { ownerId, date, time});
  const colRef = collection(db, 'events');
  const qryRef = query(colRef, where('owner_id', '==', ownerId),  where('date', '==', date), where('start', '==', time));
  const snap = await getDocs(qryRef);

  if (!snap.empty) {
    return snap.docs.map(x => {
      return { ...x.data(), id: x.id };
    });
  }
  return [];
};

const getScheduleQuery = (ownerId, date) => {
  if (!ownerId) return null;

  const colRef = collection(db, 'events');
  return query(colRef, where('owner_id', '==', ownerId), where('date', '==', date));
};

const getLogsQuery = (ownerId, date) => {
  if (!ownerId) return null;

  const colRef = collection(db, 'logs');
  return  query(colRef, where('owner_id', '==', ownerId), where('date', '==', date));
};

const retrieveEventById = async (id) => {
  const docRef = doc(db, 'events', id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

const createEvent = async (ownerId, date, data) => {
  const eventRef = collection(db, 'events');
  const start = data.hour * 60 + data.min;
  const payload = { ...data, owner_id: ownerId, date, start }

  const { id } = await addDoc(eventRef, payload);
  const docData = await retrieveEventById(id);
  return { ...docData, id };
};

const updateEvent = async (id, data) => {
  const eventRef = doc(db, 'events', id);
  console.log('*** updateEvent:', { id, data });
  return await updateDoc(eventRef, data);
};

const createScheduleFromTemplate = async (ownerId, date) => {
  if (!ownerId) return null;

  const qryLogs = getLogsQuery(ownerId, date);
  try {
    // check log entry before generating event docs from our template
    const snapshot = await getDocs(qryLogs);
    if (!snapshot.size) {
      // create event doc for every template
      const eventRef = collection(db, 'events');
      template.forEach(async t => {
        const start = t.hour * 60 + t.min;
        // console.log({ ...t, owner_id: ownerId, date, start })
        await addDoc(eventRef, { ...t, owner_id: ownerId, date, start });
      });

      // create a log doc for the this operation
      const logRef = collection(db, 'logs');
      await addDoc(logRef, { owner_id: ownerId, date });
    }
  } catch(error) {
    console.log('*** generateEvents:error', error);
  }
};

const createWeekendSchedule = async (date) => {
  return [
    {
      title: 'Rest and Recreation',
      hour: 8,
      min: 0,
      all_day: true,
      alert: 0,
    }
  ];
};

const removeEventById = async (id) => {
  console.log('*** removeEventFromSchedule:', id);
  await deleteDoc(doc(db, 'events', id));
}

export {
  getAuth,
  registerUser,
  signInUser,
  signOutUser,
  createScheduleFromTemplate,
  getScheduleQuery,
  getEventsForNotification,
  getEventsByDate,
  createWeekendSchedule,
  removeEventById,
  createEvent,
  updateEvent,
  retrieveEventById,
}
