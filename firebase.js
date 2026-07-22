// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDJDPGteJG_WkMISuv9s8649r7a5ND8sV0",
  authDomain: "teacher-pay.firebaseapp.com",
  projectId: "teacher-pay",
  storageBucket: "teacher-pay.firebasestorage.app",
  messagingSenderId: "990950893185",
  appId: "1:990950893185:web:a90540e2fc06c73b110f80"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
