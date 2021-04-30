import Swal from 'sweetalert2'
import types from "../types/types";
import firebase, { googleAuthProvider } from  "../firebase/firebase-config";
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';

export function startLoginEmailPassword( email, password ) {

  return ( dispatch ) => {

    dispatch( startLoading() );

    return firebase.auth().signInWithEmailAndPassword( email, password )
      .then( ({ user }) => {
        // Inicializa el login
        dispatch( login(user.uid, user.displayName) );

        // Termina el Loading
        dispatch( finishLoading() );
      })
      .catch(error => {
        // console.log(error);
        // Termina el Loading si hay errores
        dispatch( finishLoading() );
        Swal.fire("Error", error.message, "error");
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
      .catch( error => Swal.fire("Error", error.message, "error") );
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

export function login( uid, displayName ) {
  return {
    type: types.login,
    payload: { uid, displayName }
  };
}

export function startLogout() {
  return async ( dispatch ) => {
    try {
      // Realiza la des-autenficación en Firebase
      await firebase.auth().signOut();

      // Una vez des-autentificado por Firebase restablecer el estado inicial
      // de la autentificación
      dispatch( logout() );

      // Limpiar las notas al salir
      dispatch( noteLogout() );

      Swal.fire({
        title: "Logout Successfull",
        icon: "success",
        showConfirmButton: false,
        text: "Comeback Soon !",
        timer: 2200
      });

    } catch( error ) {
      Swal.fire("Error", error.message, "error");
    }
  };
}

export function logout() {
  return {
    type: types.logout
  };
}