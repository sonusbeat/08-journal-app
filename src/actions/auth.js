import types from '../types/types';

export const startLoginEmailPassword = ( email, password ) => {

  return ( dispatch ) => {

    setTimeout( () => {

      dispatch( login(123, "Daniel") );

    }, 3000);

  };

};

const login = ( uid, displayName ) => ({
  type: types.login,
  payload: { uid, displayName }
});

export default login;