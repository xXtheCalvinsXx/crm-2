// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhD0hAiSlMjG9Y-3RstsFaAzdgELhJ3Bk",
  authDomain: "xxthecalvinsxx-f8d6f.firebaseapp.com",
  projectId: "xxthecalvinsxx-f8d6f",
  storageBucket: "xxthecalvinsxx-f8d6f.appspot.com",
  messagingSenderId: "162288928335",
  appId: "1:162288928335:web:6a27e1669be5255e570c3a",
  measurementId: "G-N2PJLHYBE0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);
const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// testing git - andrew