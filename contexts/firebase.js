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
  addDoc,
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

const getEventsForNotification = async (ownerId, date, hour) => {
  console.log({ ownerId, date, hour});
  const colRef = collection(db, 'events');
  const qryRef = query(colRef, where('owner_id', '==', ownerId),  where('date', '==', date), where('start', '==', hour));
  const snap = await getDocs(qryRef);
  // todo: handle multiple events in the given hour
  if (!snap.empty) {
    // we just take the first document for now
    const x = snap.docs[0];
    // console.log({ ... x.data(), id: x.id });
    return { ... x.data(), id: x.id };
  }
  return null;
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
        console.log({ ...t, owner_id: ownerId, date })
        await addDoc(eventRef, { ...t, owner_id: ownerId, date });
      });

      // create a log doc for the this operation
      const logRef = collection(db, 'logs');
      await addDoc(logRef, { owner_id: ownerId, date });
    }
  } catch(error) {
    console.log('*** generateEvents:error', error);
  }
};

export {
  getAuth,
  registerUser,
  signInUser,
  signOutUser,
  createScheduleFromTemplate,
  getScheduleQuery,
  getEventsForNotification,
}
