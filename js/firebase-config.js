// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDn-9tGJRo8orusYbIxAGQWTzRP6gph1h0",
  authDomain: "rm-pondokmarisa.firebaseapp.com",
  projectId: "rm-pondokmarisa",
  storageBucket: "rm-pondokmarisa.firebasestorage.app",
  messagingSenderId: "1085910653749",
  appId: "1:1085910653749:web:b1206590c1d4353b8a4a7c",
  measurementId: "G-89V7JTGX83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
