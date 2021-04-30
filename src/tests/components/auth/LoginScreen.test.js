import { MemoryRouter } from "react-router-dom"
import { Provider } from "react-redux";
import { mount } from "enzyme";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import LoginScreen from "../../../components/auth/LoginScreen";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  }
};

let store = mockStore( initialState );

const wrapper = mount(
  <Provider store={ store }>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);

describe("Pruebas en <LoginScreen />", () => {

  beforeEach(() => {
    store = mockStore( initialState );
  });

  test("Deberia de coincidir con el Snapshot", () => {

    expect( wrapper ).toMatchSnapshot();

  });

});