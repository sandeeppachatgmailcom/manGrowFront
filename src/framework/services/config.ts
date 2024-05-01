
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
const firebaseConfig = {
    apiKey: "AIzaSyBjsSYkHkhOzxuIeg1Ckrh9irjslXcYBkU",
    authDomain: "mangrow-316f3.firebaseapp.com",
    projectId: "mangrow-316f3",
    storageBucket: "mangrow-316f3.appspot.com",
    messagingSenderId: "42827561595",
    appId: "1:42827561595:web:547ec2cef231c22f7940de",
    measurementId: "G-T9DV10MH34"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseDB = getStorage(app);

export default firebaseDB;
