// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBV7JFtQo0quVrVAcLEhgfbp7M_lhfyyLs",
  authDomain: "reactjsxfirebase-7cfd3.firebaseapp.com",
  projectId: "reactjsxfirebase-7cfd3",
  storageBucket: "reactjsxfirebase-7cfd3.firebasestorage.app",
  messagingSenderId: "55599146083",
  appId: "1:55599146083:web:d68a3f3ba7823225124456",
  measurementId: "G-D32L21KCQG"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
export {auth};