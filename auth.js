import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Register
window.register = async function () {
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  if (!email || !password) {
    alert("সব তথ্য পূরণ করুন");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Account Created Successfully!");
    location.href = "dashboard.html";
  } catch (error) {
    alert(error.message);
  }
};

// Login
window.login = async function () {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Email ও Password দিন");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    location.href = "dashboard.html";
  } catch (error) {
    alert(error.message);
  }
};

// Logout
window.logout = async function () {
  await signOut(auth);
  location.href = "login.html";
};

// Protect Dashboard
onAuthStateChanged(auth, (user) => {
  const page = location.pathname.split("/").pop();

  if (page === "dashboard.html" && !user) {
    location.href = "login.html";
  }

  if ((page === "login.html" || page === "register.html") && user) {
    location.href = "dashboard.html";
  }
});
