import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC7ylprcCTWJ7tk3Zfo96Qtw1DewIEIwsc",
  authDomain: "firestore-todoapp-fe704.firebaseapp.com",
  projectId: "firestore-todoapp-fe704",
  storageBucket: "firestore-todoapp-fe704.appspot.com",
  messagingSenderId: "329344079385",
  appId: "1:329344079385:web:6ad3ed7c03014c4e153c88"
};
initializeApp(firebaseConfig);
export const db= getFirestore();