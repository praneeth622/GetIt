// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5balVZNX4Zc9wrBtLOE1FfwoRMX5Jd6I",
  authDomain: "getit-e106c.firebaseapp.com",
  projectId: "getit-e106c",
  storageBucket: "getit-e106c.firebasestorage.app",
  messagingSenderId: "94198347064",
  appId: "1:94198347064:web:50edf638e350eb5e45fdcd",
  measurementId: "G-C8PE55PN37"
};

// Initialize Firebase only if it hasn't been initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };