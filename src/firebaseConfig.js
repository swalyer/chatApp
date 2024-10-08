// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATwSwPEJ6_hhDa3yjwMDsztG5AU239nYU",
  authDomain: "chat-app-3efe9.firebaseapp.com",
  projectId: "chat-app-3efe9",
  storageBucket: "chat-app-3efe9.appspot.com",
  messagingSenderId: "155852750518",
  appId: "1:155852750518:web:9bfb245819d82ef83eb017",
  measurementId: "G-EGHC7JGXZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);