import types from "../types/types";
import firebase, { googleAuthProvider } from  "../firebase/firebase-config";

export function startLoginEmailPassword( email, password ) {

  return ( dispatch ) => {

    firebase.auth().signInWithEmailAndPassword( email, password )
      .then( ({ user }) => {
        dispatch( login(user.uid, user.displayName) );
      })
      .catch(error => console.log(error));

  };

}

export function startRegisterWithEmailPasswordName( email, password, name ) {
  return ( dispatch ) => {
    firebase.auth().createUserWithEmailAndPassword( email, password )
      .then( async({ user }) => {

        // Firebase Function to update Display Name
        await user.updateProfile({ displayName: name });

        dispatch( login(user.uid, user.displayName) );
      })
      .catch( error => console.log(error) );
  };
}

export function startGoogleLogin() {
  return ( dispatch ) => {
    firebase.auth().signInWithPopup( googleAuthProvider )
      .then( ({ user }) => {
        dispatch( login( user.uid, user.displayName ) );
      });
  };
}

export default function login( uid, displayName ) {
  return {
    type: types.login,
    payload: { uid, displayName }
  };
}