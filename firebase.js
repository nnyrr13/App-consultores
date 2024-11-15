// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH75kYAZBxwSH5u2Dtt2RfkTUGa5kM86E",
  authDomain: "perez-consultores-react-29631.firebaseapp.com",
  projectId: "perez-consultores-react-29631",
  storageBucket: "perez-consultores-react-29631.appspot.com",
  messagingSenderId: "435805760543",
  appId: "1:435805760543:web:46d094af16786440d8392a"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
