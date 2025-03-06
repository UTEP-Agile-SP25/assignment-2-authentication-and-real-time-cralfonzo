// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdkBHnbSC03tNhBCllI-y-HbvrbnDdLak",
  authDomain: "alfonzo-sandbox.firebaseapp.com",
  projectId: "alfonzo-sandbox",
  storageBucket: "alfonzo-sandbox.firebasestorage.app",
  messagingSenderId: "13056175432",
  appId: "1:13056175432:web:29aa5c1e62be0f6c6fd77d",
  measurementId: "G-58GJX5CKX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app