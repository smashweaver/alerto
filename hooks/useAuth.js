import { useEffect } from 'react';

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export default function useAuth({ setUser }) {
  const registerUser = async (email, password, name) => {
    const auth = getAuth();
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      auth.currentUser.displayName = name;
      await updateProfile(user, { displayName: name });
      setUser(userCredential.user);
    } catch(error) {
      throw error;
    }
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
      throw error;
    }
  };

  useEffect(() => {
    console.log('*** mounting useAuth');
    const auth = getAuth();
    auth.onAuthStateChanged(u => {
      // console.log('*** onAuthStateChanged\n', JSON.stringify(u, null, 2));
      if (!u) {
        console.log('*** user is signed out');
      } else {
        console.log('*** user is signed in');
      }
      setUser(u);
    });
  }, []);

  return {
    registerUser,
    signInUser,
    signOutUser,
  };
}
