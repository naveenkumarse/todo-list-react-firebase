// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsSUOGeZV5MvL5g40yFmiv4gfjzJeI3NE",
  authDomain: "todo-app-react-nk.firebaseapp.com",
  projectId: "todo-app-react-nk",
  storageBucket: "todo-app-react-nk.appspot.com",
  messagingSenderId: "794888627031",
  appId: "1:794888627031:web:b8a60b506addc0abac1412"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);