import types from "../types/types";
import firebase, { googleAuthProvider } from  "../firebase/firebase-config";

const startLoginEmailPassword = ( email, password ) => {

  return ( dispatch ) => {

    setTimeout( () => {

      dispatch( login(123, "Daniel") );

    }, 3000);

  };

};

const startGoogleLogin = () => {
  return ( dispatch ) => {
    firebase.auth().signInWithPopup( googleAuthProvider )
      .then( ({ user }) => {
        dispatch( login( user.uid, user.displayName ) );
      });
  };
};

const login = ( uid, displayName ) => ({
  type: types.login,
  payload: { uid, displayName }
});

export {
  startLoginEmailPassword,
  startGoogleLogin,
  login as default
};