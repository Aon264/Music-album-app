import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNYhYPYuYp4f8-14kmQc4B-B0DED2nD-c",
  authDomain: "music-album-app-991df.firebaseapp.com",
  projectId: "music-album-app-991df",
  storageBucket: "music-album-app-991df.firebasestorage.app",
  messagingSenderId: "570669147685",
  appId: "1:570669147685:web:cced0b3c7f684647ad81cc"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);