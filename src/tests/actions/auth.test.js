import { login, logout } from "../../actions/auth";
import types from '../../types/types';

describe("Pruebas en Auth", () => {

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

});
