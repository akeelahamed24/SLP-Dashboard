import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCPqApzHdsdNgRDLvWLwIS7h3FL_3P-mew",
  authDomain: "svce-learners-platform.firebaseapp.com",
  databaseURL: "https://svce-learners-platform-default-rtdb.firebaseio.com", // Add this
  projectId: "svce-learners-platform",
  storageBucket: "svce-learners-platform.firebasestorage.app",
  messagingSenderId: "697993865335",
  appId: "1:697993865335:web:9f4c7e6807b31ef7903e72",
  measurementId: "G-0XL013BG0B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const analytics = getAnalytics(app);