// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr8mGzhBiARRhE-c22M6ogXFw7gu65D_E",
  authDomain: "gpstracker-36817.firebaseapp.com",
  projectId: "gpstracker-36817",
  storageBucket: "gpstracker-36817.appspot.com",
  messagingSenderId: "1071301764330",
  appId: "1:1071301764330:web:1761d18c6316a507f66393",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = getDatabase(app);
