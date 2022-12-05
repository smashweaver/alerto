import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
// import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAoMRa4dyrX5lz4QebGX0xLCcnTTTAt7no",
  authDomain: "capstone-mcm.firebaseapp.com",
  projectId: "capstone-mcm",
  storageBucket: "capstone-mcm.appspot.com",
  messagingSenderId: "592672261236",
  appId: "1:592672261236:web:3f643cffe4615aafc27d21"
};

const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
// const db = getFirestore(app);

const registerUser = async (email, password, name) => {
  const auth = getAuth();
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName: name });
};

const signOutUser = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch(error) {
    console.log(error.message);
  }
};

export { registerUser, signOutUser }
