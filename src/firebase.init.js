// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR2BorLlLyHmqMPnuo8kopA3vCvwvMo3Q",
  authDomain: "lead-collector-70be6.firebaseapp.com",
  projectId: "lead-collector-70be6",
  storageBucket: "lead-collector-70be6.appspot.com",
  messagingSenderId: "177143323025",
  appId: "1:177143323025:web:0d00c3c9956d0e3bad2230"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;