// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-auth-786b2.firebaseapp.com',
  projectId: 'mern-auth-786b2',
  storageBucket: 'mern-auth-786b2.appspot.com',
  messagingSenderId: '124471142787',
  appId: '1:124471142787:web:9b046175b74b7f6c9e6eb6',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
