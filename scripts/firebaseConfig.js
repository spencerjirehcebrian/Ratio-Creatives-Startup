// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBTiJVkDRExZjELm2Cx33XVO63KXuFhQTg",
  authDomain: "ratio-creatives-startup.firebaseapp.com",
  databaseURL: "https://ratio-creatives-startup-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ratio-creatives-startup",
  storageBucket: "ratio-creatives-startup.appspot.com",
  messagingSenderId: "942211714488",
  appId: "1:942211714488:web:af9b250525772d3637134d",
  measurementId: "G-3GNZ7SZ3B1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();

export { app, db, auth, storage };
