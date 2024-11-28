// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYVuO_5jCPc-4FAlwb5_8r-mFC_X5CNXE",
  authDomain: "ubuntu-24ce2.firebaseapp.com",
  projectId: "ubuntu-24ce2",
  storageBucket: "ubuntu-24ce2.firebasestorage.app",
  messagingSenderId: "746591839262",
  appId: "1:746591839262:web:89a737e04075f1dcf27a0f",
  measurementId: "G-5EYRBEDPH7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
