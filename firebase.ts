// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };