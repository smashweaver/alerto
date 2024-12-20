import { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, onSnapshot } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import { firebase } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const app = initializeApp(firebase.config);
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

  const createStream = (qryRef, handleChange, callback = () => {}) => {
    console.log('*** observing')
    const onNext = (snapshot) => {
      snapshot.docChanges().forEach(change => {
        const { type } = change;
        const { id } = change.doc;
        const data = { ...change.doc.data(), id };
        handleChange(type, data);
      })
      callback();
    };
    const unsubscribe = onSnapshot(qryRef, onNext);

    return unsubscribe;
  };

  return { db, createStream };
}
