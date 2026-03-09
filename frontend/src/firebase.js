// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeeOEQRWbd7nqKFNh5UKStYz3YeE0zGs8",
  authDomain: "sweet-bakery-83aa6.firebaseapp.com",
  projectId: "sweet-bakery-83aa6",
  storageBucket: "sweet-bakery-83aa6.firebasestorage.app",
  messagingSenderId: "1059395597926",
  appId: "1:1059395597926:web:0f569a32f97f0849c8dfa7",
  measurementId: "G-3FXK7X6JYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth (app);