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
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore"

import { firebaseConfig, template } from '../constants';

// init firebase app
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

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

const getEventsQuery = (ownerId, date) => {
  const colRef = collection(db, 'events');
  return query(colRef, where('owner_id', '==', ownerId), where('date', '==', date));
}

const getLogsQuery = (ownerId, date) => {
  const colRef = collection(db, 'logs');
  return  query(colRef, where('owner_id', '==', ownerId), where('date', '==', date));
}

const createEventsFromTemplate = async (ownerId, date) => {
  const qryRef = getLogsQuery(ownerId, date);
  try {
    const snapshot = await getDocs(qryRef);
    if (!snapshot.size) {
      const eventRef = collection(db, 'events');
      template.forEach(async t => {
        console.log({ ...t, owner_id: ownerId, date })
        await addDoc(eventRef, { ...t, owner_id: ownerId, date });
      });

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
  createEventsFromTemplate,
  getEventsQuery,
}
