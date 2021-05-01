import { MemoryRouter } from "react-router-dom"
import { Provider } from "react-redux";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import firebase from "../../firebase/firebase-config";
import AppRouter from '../../routers/AppRouter';
import { login } from '../../actions/auth';
import { act } from "react-dom/test-utils";

jest.mock("../../actions/auth", () => ({
  // Simular llamar la acción de login con jest.fn()
  login: jest.fn(),
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

// Estado inicial del State de Redux
const initialState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    active: {
      id: "6743579645",
    },
    notes: []
  }
};

let store = mockStore( initialState );

// Simular el dispatch para las pruebas
store.dispatch = jest.fn();

describe("Pruebas en <AppRouter />", () => {

  test("Deberia de llamar el login si estoy autenticado", async () => {

    // 1. Se inicializa la variable user
    let user;

    // 2. Se envuelve en un act para que sea un ambiente controlado
    await act( async () => {
      // 3. Se autentifica con firebase
      const userCredentials = await firebase.auth().signInWithEmailAndPassword("test@testing.com", "0123456789");

      // 4 Se almacenan las credenciales en la variable user
      user = userCredentials.user;

      // 5. Se monta Redux, MemoryRouter y AppRouter
      mount(
        <Provider store={ store }>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });

    // 6. Se espera que la accón login halle sido llamada con el
    //    user.uid y que el displayName se halle mandado null
    expect( login ).toHaveBeenCalledWith( user.uid, null );

  });

});