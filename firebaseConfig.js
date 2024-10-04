import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Ваши настройки Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAQrcdna9uUwREnkXzzpk7fr1Q9B0rbGkQ",
  authDomain: "addpet-f6386.firebaseapp.com",
  projectId: "addpet-f6386",
  storageBucket: "addpet-f6386.appspot.com",
  messagingSenderId: "35899716729",
  appId: "1:35899716729:web:b4f7451f5e9b566e2dd0a8",
  measurementId: "G-5KNZF0MBQJ",
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
