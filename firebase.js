// Firebase SDK Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJDPGteJG_WkMISuv9s8649r7a5ND8sV0",
  authDomain: "teacher-pay.firebaseapp.com",
  projectId: "teacher-pay",
  storageBucket: "teacher-pay.firebasestorage.app",
  messagingSenderId: "990950893185",
  appId: "1:990950893185:web:a90540e2fc06c73b110f80"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);


// Export Services
export { auth, db };
