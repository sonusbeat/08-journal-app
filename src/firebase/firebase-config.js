import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhoMiCjJfJkjRQPFAfpfJTsd8xI4YfBsg",
  authDomain: "react-app-cursos-ff956.firebaseapp.com",
  projectId: "react-app-cursos-ff956",
  storageBucket: "react-app-cursos-ff956.appspot.com",
  messagingSenderId: "266056971758",
  appId: "1:266056971758:web:2ee00eb88df5966c984aff",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  firebase as default
};
