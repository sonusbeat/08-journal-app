import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import RegisterScreen from "../../../../components/auth/RegisterScreen";
import types from '../../../../types/types';

// jest.mock("../../../../actions/auth", () => ({
  // Simular algo aqui
// }));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initialState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  }
};

let store = mockStore( initialState );

// Simular el dispatch para las pruebas
// store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={ store }>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);

describe("Pruebas en <RegisterScreen />", () => {

  // beforeEach(() => {
    // Limpiar el store volviendolo a sus valores iniciales
    // store = mockStore( initialState );

    // Buena practica limpiar todos los Mocks
    // jest.clearAllMocks();
  // });

  test("Deberia de coincidir con el Snapshot", () => {

    expect( wrapper ).toMatchSnapshot();

  });

  test("Debe de hacer el dispatch de la acción respectiva", () => {

    const nameField = wrapper.find( 'input[name="name"]');

    nameField.simulate("change", {
      target: {
        value: "Daniel",
        name: "name"
      }
    });

    // Disparar el formulario con simulate
    wrapper.find("form").simulate("submit", {
      preventDefault(){}
    });

    const actions = store.getActions();

    expect( actions[0] ).toEqual({
      type: types.uiSetError,
      payload: "Email should be present !"
    });

  });

});