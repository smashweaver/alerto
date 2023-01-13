import { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, onSnapshot } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import { firebaseConfig } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function useFirebase() {
  useEffect(() => {
    console.log('*** mounting useFirebase');
    try {
      initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
      });
    } catch (error) {
      console.log(`*** ${error.message}`);
    };
  }, []);

  const observer = (qryRef, handleChange, callback = () => {}) => {
    const unsubscribe = onSnapshot(qryRef, (snapshot) => {
      try {
        snapshot.docChanges().forEach(change => {
          const { type } = change;
          const { id } = change.doc;
          const data = { ...change.doc.data(), id };
          handleChange(type, data);
        })
        callback();
      } catch(error) {
        console.log(`*** ${error.message}`);
      }
    });
    return unsubscribe;
  };

  return { app, db, observer };
}
