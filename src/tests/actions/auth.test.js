import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { db } from "../../firebase/firebase-config";

import {
  login,
  logout,
  startLogout,
  startLoginEmailPassword
} from "../../actions/auth";

import types from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};

let store = mockStore( initialState );

describe("Pruebas en Auth", () => {

  beforeEach(() => {
    store = mockStore( initialState );
  });

  test("Login debe de llamar la acción correspondiente", () => {
    // 1. Crear el uid
    const uid = "0123456789";

    // 2. Crear el displayName
    const displayName = "Daniel";

    // 3. Llamar la acción login y almacenarla en una variable
    const loginAction = login( uid, displayName );

    // 4. Comparar la variable loginAction que coincida
    //    con el objeto esperado
    expect( loginAction ).toEqual({
      type: types.login,
      payload: { uid, displayName }
    });

  });

  test("Logout debe de llamar la acción correspondiente", () => {

    // 1. Llamar la acción logout y almacenarla en una variable
    const logoutAction = logout();

    // 2. Comparar la variable logoutAction que coincida
    //    con el objeto esperado
    expect( logoutAction ).toEqual({
      type: types.logout
    });

  });

  test("Debe realizar el startLogout", async () => {

    // 1. Disparamos la acción startLogout
    await store.dispatch( startLogout() );

    // 2. Almacenamos en una variable las acciones llamadas
    const actions = store.getActions();

    // 3. Comparamos la primer acción que coincida con el objeto esperado
    expect( actions[0] ).toEqual({
      type: types.logout
    });

    // 2. Comparamos la segunda acción que coincida con el objeto esperado
    expect( actions[1] ).toEqual({
      type: types.notesLogoutCleaning
    });

  });

  test("Debe de iniciar el startLoginEmailPassword", async () => {

    // 1. Crear la variable del correo electrónico
    const email = "test@testing.com";

    // 2. Crear la variable de la contraseña
    const password = "0123456789";

    // 3. Realizar el dispatch de startLoginEmailPassword
    //    con los argumentos necesarios
    await store.dispatch( startLoginEmailPassword(email, password) );

    // 4. Obtener las acciones del store
    const actions = store.getActions();

    // 5. Comparar que las dos acciones sean iguales
    expect( actions[0] ).toEqual({
      type: types.uiStartLoading
    });

    // 6. Comparar que las dos acciones sean iguales
    //    y que los payloads conincidan
    expect( actions[1] ).toEqual({
      type: types.login,
      payload: {
        uid: 'WPKus0ruF1P63zgqkC0Np4RKcMr1',
        displayName: null
      }
    });

  });

});
