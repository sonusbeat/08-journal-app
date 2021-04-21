import types from "../types/types";
import firebase, { googleAuthProvider } from  "../firebase/firebase-config";
import { finishLoading, startLoading } from './ui';

export function startLoginEmailPassword( email, password ) {

  return ( dispatch ) => {

    dispatch( startLoading() );

    firebase.auth().signInWithEmailAndPassword( email, password )
      .then( ({ user }) => {
        // Inicializa el login
        dispatch( login(user.uid, user.displayName) );

        // Termina el Loading
        dispatch( finishLoading() );
      })
      .catch(error => {
        console.log(error);
        // Termina el Loading si hay errores
        dispatch( finishLoading() );
      });

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