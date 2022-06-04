import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  collectionGroup,
  getDocs,
  orderBy,
  where,
  query,
  Timestamp,
  addDoc,
  updateDoc,
} from "firebase/firestore/lite";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export {
  onAuthStateChanged,
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  collectionGroup,
  getDocs,
  orderBy,
  where,
  query,
  RecaptchaVerifier,
  GoogleAuthProvider,
  Timestamp,
  signInWithPhoneNumber,
  signOut,
  updateDoc,
  signInWithPopup,
  updateProfile,
  ref,
  getDownloadURL,
  uploadBytesResumable,
};
export default app;
