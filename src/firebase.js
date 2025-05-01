// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// ✅ Your web app's Firebase config
export const firebaseConfig = {
  apiKey: "AIzaSyDgeS5ljDHoyAT_PplGbW6Vj3-lapbnpjM",
  authDomain: "meetings-9a00b.firebaseapp.com",
  databaseURL: "https://meetings-9a00b-default-rtdb.firebaseio.com",
  projectId: "meetings-9a00b",
  storageBucket: "meetings-9a00b.appspot.com",
  messagingSenderId: "728912838881",
  appId: "1:728912838881:web:b274b791a2b5dce845f7a0"
};

// ✅ Initialize Firebase App (only once)
const app = initializeApp(firebaseConfig);

// ✅ Export the initialized services
export const auth = getAuth(app);
export const db = getDatabase(app);
