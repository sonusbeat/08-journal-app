import { MemoryRouter } from "react-router-dom"
import { Provider } from "react-redux";
import { mount } from "enzyme";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import LoginScreen from '../../../../components/auth/LoginScreen';
import { startGoogleLogin, startLoginEmailPassword } from "../../../../actions/auth";

jest.mock("../../../../actions/auth", function() {
  return {
    // Simular llamar la acción de startGoogleLogin con jest.fn()
    startGoogleLogin: jest.fn(),

    // Simular llamar la acción de startLoginEmailPassword con jest.fn()
    startLoginEmailPassword: jest.fn(),
  };
});

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

// Estado inicial del State de Redux
const initialState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  }
};

let store = mockStore( initialState );

// Simular el dispatch para las pruebas
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={ store }>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);

describe("Pruebas en <LoginScreen />", () => {

  beforeEach(() => {
    // Limpiar el store volviendolo a sus valores iniciales
    store = mockStore( initialState );

    // Buena practica limpiar todos los Mocks
    jest.clearAllMocks();
  });

  test("Deberia de coincidir con el Snapshot", () => {

    expect( wrapper ).toMatchSnapshot();

  });

  test('Debe de disparar la acción de startGoogleLogin', () => {
    // 1. Buscar el botón de Google y simular el evento click
    wrapper.find(".google-btn").prop("onClick")();

    // 2. Probar que la acción halle sido llamado por lo menos 1 vez
    expect( startGoogleLogin ).toHaveBeenCalled();
  });

  test("Deberia de disparar el startLogin con los respectivos argumentos", () => {
    // 1. Inicializar el correo electronico
    const email = "test@testing.com";

    // 2. Inicializar la contraseña
    const password = "0123456789";

    // 3. Simular el llenado del campo de email
    wrapper.find('input[name="email"]').simulate('change', {
      target: {
        name: "email", // Nota asi debe de llamarse en tu formulario
        value: email, // El valor lo tomo de la variable
      }
    });

    // 4. Simular el llenado del campo del password
    wrapper.find('input[name="password"]').simulate('change', {
      target: {
        name: "password", // Nota asi debe de llamarse en tu formulario
        value: password, // El valor lo tomo de la variable
      }
    });

    // 4. Buscar el botón de Google y simular el evento click
    wrapper.find("form").prop("onSubmit")({
      preventDefault(){}
    });


    // 5. Probar que la acción halle sido llamada
    expect( startLoginEmailPassword ).toHaveBeenCalledWith(email, password);
  });

});