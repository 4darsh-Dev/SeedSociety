// firebaseConfig.ts

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDBzBmO7piHz6L3Md4Wp_-J1YJDTkJN6VA",
    authDomain: "contree-71879.firebaseapp.com",
    projectId: "contree-71879",
    storageBucket: "contree-71879.firebasestorage.app",
    messagingSenderId: "971432129340",
    appId: "1:971432129340:web:36941281ad21e118c82439",
    measurementId: "G-PSKGYGRSE0"
  };

let app: FirebaseApp;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;