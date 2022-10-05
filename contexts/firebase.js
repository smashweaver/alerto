import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
const auth = getAuth();
// const db = getFirestore();

export {
  auth,
  signInWithEmailAndPassword,
}
