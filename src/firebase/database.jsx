import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBbp2ljS00-XPhuNOU3NKmxHVGVrOf7vAs",
    authDomain: "akvehicle45.firebaseapp.com",
    projectId: "akvehicle45",
    storageBucket: "akvehicle45.appspot.com",
    messagingSenderId: "585770086730",
    appId: "1:585770086730:web:0b1f07700bb4560f91d1b3",
    measurementId: "G-40MLDBM7L8"
};

const firebaseApp = initializeApp(firebaseConfig);

//const analytics = getAnalytics(firebaseApp);
const storage = getStorage(firebaseApp);
const database = getDatabase(firebaseApp);

export { storage, firebaseApp, database };