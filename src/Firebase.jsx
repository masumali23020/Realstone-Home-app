// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByydfxq0R9D1F-2sfgBNVGuRT_-ZIetqs",
  authDomain: "realtone-clone-react.firebaseapp.com",
  projectId: "realtone-clone-react",
  storageBucket: "realtone-clone-react.appspot.com",
  messagingSenderId: "187107356273",
  appId: "1:187107356273:web:adfe186a80120910aa75d0"
};

// Initialize Firebase
initializeApp(firebaseConfig);
;
export const db = getFirestore()