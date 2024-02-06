// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPVeKscp_XbfdC1yab9HmLnvtZq3I4UD4",
  authDomain: "the-hook-411322.firebaseapp.com",
  projectId: "the-hook-411322",
  storageBucket: "the-hook-411322.appspot.com",
  messagingSenderId: "128590939010",
  appId: "1:128590939010:web:2be96e518354590fcf859b",
  measurementId: "G-2752NTGK1W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
auth.useDeviceLanguage();
const googleAuthProvider = new GoogleAuthProvider();
export { auth, db, googleAuthProvider };
