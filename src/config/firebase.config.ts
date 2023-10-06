import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyANLBv1Pz3AY3J2G8eLNU0Gh-xpSdHwArc",
  authDomain: "doctor-office-management.firebaseapp.com",
  projectId: "doctor-office-management",
  storageBucket: "doctor-office-management.appspot.com",
  messagingSenderId: "310595323440",
  appId: "1:310595323440:web:7ba86dacbec3b587decff5"
};

export const app = initializeApp(firebaseConfig);