// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwr8Utjj3ugX6YTjMZBlQR8Ey6GkMNycQ",
  authDomain: "vite-contact-4f971.firebaseapp.com",
  projectId: "vite-contact-4f971",
  storageBucket: "vite-contact-4f971.appspot.com",
  messagingSenderId: "291388240154",
  appId: "1:291388240154:web:010e26cc1f97bbcb02fca3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)