import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2E61f9MwaWRzbRLjgrwhN-puA-ApO5rY",
  authDomain: "udemy-cloned.firebaseapp.com",
  projectId: "udemy-cloned",
  storageBucket: "udemy-cloned.firebasestorage.app",
  messagingSenderId: "609953392950",
  appId: "1:609953392950:web:05b72ec65a776b9c6beb97",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
