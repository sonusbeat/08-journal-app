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

const firebaseConfigTesting = {
  apiKey: "AIzaSyDzZaSD3JmKmhYAMJptYIfEOfb5DtVen7E",
  authDomain: "redux-demo-88071.firebaseapp.com",
  projectId: "redux-demo-88071",
  storageBucket: "redux-demo-88071.appspot.com",
  messagingSenderId: "401806799073",
  appId: "1:401806799073:web:c8331561425c5e58c647a0"
};

if ( process.env.NODE_ENV === "test" ) {
  // Initialize Firebase "Testing"
  firebase.initializeApp(firebaseConfigTesting);
} else {
  // Initialize Firebase "Production"
  firebase.initializeApp(firebaseConfig);
}


const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  firebase as default
};
