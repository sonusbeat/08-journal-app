import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import RegisterScreen from "../../../../components/auth/RegisterScreen";
import types from '../../../../types/types';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

// Iniciar el stado
const initialState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  }
};

// Crear el store con mockStore
let store = mockStore( initialState );

const wrapper = mount(
  // Envolver con el provider de Redux
  // y pasarle el store
  <Provider store={ store }>
    {/* Envolver con MemoryRouter nuestro componente */}
    <MemoryRouter>
      {/* Cargar el componente */}
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);

describe("Pruebas en <RegisterScreen />", () => {

  test("Deberia de coincidir con el Snapshot", () => {

    // Comparar el wrapper con el Snapshot
    expect( wrapper ).toMatchSnapshot();

  });

  test("Debe de hacer el dispatch de la acción respectiva", () => {

    // 1. Buscar dentro del wrapper le input
    const nameField = wrapper.find( 'input[name="name"]');

    // 2. Simular el llenado del input
    nameField.simulate("change", {
      target: {
        value: "Daniel",
        name: "name"
      }
    });

    // 3. Disparar el formulario con simulate
    wrapper.find("form").simulate("submit", {
      preventDefault(){}
    });

    // 4. Obtener las acciones y almacenarlas en una variable
    const actions = store.getActions();

    // 5. Debe coincidir el objeto de la accion correspondiente al error,
    //    con el objeto establecido
    expect( actions[0] ).toEqual({
      type: types.uiSetError,
      payload: "Email should be present !"
    });

  });

  test("Debe de mostrar la caja de alerta con el error", () => {

    // Iniciar el stado
    const initialState = {
      auth: {},
      ui: {
        loading: false,
        msgError: "Nombre no puede ir vacio"
      }
    };

    const store = mockStore( initialState );

    const wrapper = mount(
      // 1. Envolver con el provider de Redux
      //    y pasarle el store
      <Provider store={store}>
        {/* 2. Envolver con MemoryRouter nuestro componente */}
        <MemoryRouter>
          {/* 3. Cargar el componente */}
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    // 4. Buscar la cajar de mensajes de error y almacenarla en una variable
    const errorBox = wrapper.find(".auth__alert-error");

    // 5. Al cargar el componente <RegisterScreen /> debe de existir
    //    el contenedor div con el mensaje de error establecido
    expect( errorBox.exists() ).toBe( true );

    // 6. Los mensajes de error deben coincidir
    expect( errorBox.text() ).toBe( initialState.ui.msgError );

  });

});