import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-73ui__pz-BInxottWSyyN6nNQhKn-2w",
  authDomain: "messages-ca0cf.firebaseapp.com",
  projectId: "messages-ca0cf",
  storageBucket: "messages-ca0cf.appspot.com", 
  messagingSenderId: "627461040492",
  appId: "1:627461040492:web:3c8db63a79b26faf77ab49",
  measurementId: "G-CYXNMTGBHB"
};

// Initiera appen
const app = initializeApp(firebaseConfig);

// Initiera Firestore
const db = getFirestore(app);

export { db };