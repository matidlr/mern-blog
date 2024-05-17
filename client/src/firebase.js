// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-e69b4.firebaseapp.com",
  projectId: "mern-blog-e69b4",
  storageBucket: "mern-blog-e69b4.appspot.com",
  messagingSenderId: "1018623043857",
  appId: "1:1018623043857:web:6644d7f8b1b36158fbc4b0"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);