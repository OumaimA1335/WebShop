import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
const FirebaseConfig = {
  apiKey: "AIzaSyBemEtBHpBrjvL0ckeUSA5x5G65JhWqalk",
  authDomain: "shopinetauth.firebaseapp.com",
  projectId: "shopinetauth",
  storageBucket: "shopinetauth.appspot.com",
  messagingSenderId: "789085115298",
  appId: "1:789085115298:web:8ca56119f797170f23d8fb",
  measurementId: "G-P7RLLF7C93"
};

// Initialize Firebase
const app = initializeApp(FirebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth();