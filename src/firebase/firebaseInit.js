// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBU3S-tiRciZn6lPOpBAUyMbiQIhimWRRQ",
  authDomain: "invoice-app-a081f.firebaseapp.com",
  projectId: "invoice-app-a081f",
  storageBucket: "invoice-app-a081f.appspot.com",
  messagingSenderId: "115948513115",
  appId: "1:115948513115:web:ed18443c8d845bc1271c7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore(app); 