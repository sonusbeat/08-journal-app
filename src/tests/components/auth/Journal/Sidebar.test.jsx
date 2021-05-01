import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import Sidebar from "../../../../components/journal/Sidebar";
import { startLogout } from "../../../../actions/auth";
import { startNewNote } from "../../../../actions/notes";

jest.mock("../../../../actions/auth", () => ({
  startLogout: jest.fn(),
}));

jest.mock("../../../../actions/notes", () => ({
  startNewNote: jest.fn(),
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

// Estado inicial del State de Redux
const initialState = {
  auth: {
    uid: "123458",
    name: "Daniel",
  },
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    notes: [],
    active: null
  }
};

let store = mockStore( initialState );

// Simular el dispatch para las pruebas
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={ store }>
    <Sidebar />
  </Provider>
);

describe("Pruebas en <Sidebar />", () => {

  test("Deberia de coincidir con el Snapshot", () => {

    expect( wrapper ).toMatchSnapshot();

  });


  test("Deberia de llamar la acción startLogout", () => {

    // 1. Llamar la acción logout presionando el boton correspondiente
    wrapper.find("#logoutBtn").prop("onClick")();

    // 2. Se espera que la acción startLogout halle sido llamada
    expect( startLogout ).toHaveBeenCalled();

  });

  test("Deberia de llamar el startNewNote", () => {

    // 1. Llamar la acción logout presionando el boton correspondiente
    wrapper.find("#newEntryBtn").prop("onClick")();

    // 2. Se espera que la acción startNewNote halle sido llamada
    expect( startNewNote ).toHaveBeenCalledWith();

  });

});
