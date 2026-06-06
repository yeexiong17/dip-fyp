// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDL-LWgtCRew5DH5JKvxVlW1cCnvTtcfA",
  authDomain: "dip-fyp-f02f5.firebaseapp.com",
  projectId: "dip-fyp-f02f5",
  storageBucket: "dip-fyp-f02f5.firebasestorage.app",
  messagingSenderId: "521116771431",
  appId: "1:521116771431:web:76c47ad16ee8c3229ca0c2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

export default app;
