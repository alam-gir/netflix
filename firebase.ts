// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHT7ivInXbDdjrvDIAhvWh5Qa6CsKcn0Q",
  authDomain: "netflix-clone-303bd.firebaseapp.com",
  projectId: "netflix-clone-303bd",
  storageBucket: "netflix-clone-303bd.appspot.com",
  messagingSenderId: "694171130863",
  appId: "1:694171130863:web:3d48670ca7f2a765bd741a",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { db, auth };
