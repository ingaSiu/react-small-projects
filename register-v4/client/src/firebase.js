// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'register-v4.firebaseapp.com',
  projectId: 'register-v4',
  storageBucket: 'register-v4.appspot.com',
  messagingSenderId: '118518433100',
  appId: '1:118518433100:web:606c43221b7e2e0261bbe9',
  measurementId: 'G-X2CJ4W920C',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
