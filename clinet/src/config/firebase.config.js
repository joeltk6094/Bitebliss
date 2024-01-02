import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSuKUK-OhV8lbZzQE2hpHQye6W3yYp_QQ",
  authDomain: "cockie-44bc1.firebaseapp.com",
  databaseURL: "https://cockie-44bc1-default-rtdb.firebaseio.com",
  projectId: "cockie-44bc1",
  storageBucket: "cockie-44bc1.appspot.com",
  messagingSenderId: "754838479534",
  appId: "1:754838479534:web:5a1ea6ba4746b27f09833f",
  measurementId: "G-B6340EF5BS"
};

const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, firestore, storage, auth };
