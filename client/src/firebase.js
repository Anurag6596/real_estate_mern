// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-13971.firebaseapp.com",
  projectId: "mern-estate-13971",
  storageBucket: "mern-estate-13971.appspot.com",
  messagingSenderId: "1083598992359",
  appId: "1:1083598992359:web:04fe5754b77027ff274342"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);