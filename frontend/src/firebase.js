// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXFmNlWBRf1tvKbJyr4mThKXqzEvyV3K4",
  authDomain: "rent-for-cents.firebaseapp.com",
  projectId: "rent-for-cents",
  storageBucket: "rent-for-cents.appspot.com",
  messagingSenderId: "124784495989",
  appId: "1:124784495989:web:a28a4dbc4f22870392d73c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);