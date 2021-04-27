import authReducer from '../../reducers/authReducer';
import types from '../../types/types';

describe("Pruebas en authReducer", () => {

  test("Debería de realizar el login", () => {
    const initialState = {};

    const action = {
      type: types.login,
      payload: {
        uid: "12354548",
        displayName: "Daniel"
      }
    };

    const state = authReducer(initialState, action);

    expect( state ).toEqual({
      uid: "12354548",
      name: "Daniel"
    });
  });

  test("Debería de realizar el logout", () => {
    const initialState = {
      uid: "12345879",
      name: "Daniel"
    };

    const action = {
      type: types.logout
    };

    const state = authReducer(initialState, action);

    expect( state ).toEqual({});
  });

  test("Debería de retornar default con una acción que no existe", () => {
    const initialState = {
      uid: "12345879",
      name: "Daniel"
    };

    const action = {
      type: "[Auth] Something",
    };

    const state = authReducer(initialState, action);

    expect( state ).toEqual( initialState );
  });

});
