import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDyRui9cL0c8XmFV4X1R8JEtMsCkDOd3lU",
  authDomain: "trainseatbooking-69d90.firebaseapp.com",
  projectId: "trainseatbooking-69d90",
  storageBucket: "trainseatbooking-69d90.appspot.com",
  messagingSenderId: "500562711973",
  appId: "1:500562711973:web:ba9c796d6d62162218844c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;