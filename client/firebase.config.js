// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAodHKD6F1SacCID151NmzEc9kex-uak4U",
    authDomain: "dip-fyp.firebaseapp.com",
    projectId: "dip-fyp",
    storageBucket: "dip-fyp.appspot.com",
    messagingSenderId: "377615810339",
    appId: "1:377615810339:web:1addae0f8d5eaf29df1696"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)
