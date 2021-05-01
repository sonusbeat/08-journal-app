import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import NoteScreen from '../../../components/notes/NoteScreen';
import { Provider } from 'react-redux';
import { activeNote } from '../../../actions/notes';

jest.mock("../../../actions/notes", ()=> ({
  activeNote: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initialState = {
  auth: {
    uid: "6750162137321",
    name: "Daniel",
  },
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    notes: [],
    active: {
      id: "87s65dfsdfs57867kjb3sdf",
      date: 68732135745156613,
      title: "My note title",
      body: "Lorem ipsum dolor dolem",
    }
  },
};

let store = mockStore( initialState);

// Simulación que se disparan las acciones
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={ store }>
    <NoteScreen />
  </Provider>
);

describe("Pruebas en <NoteScreen />", () => {

  test("Deberia de coincidir con el snapshot", () => {

    expect(wrapper).toMatchSnapshot();

  });

  test("Deberia de disparar el active note", () => {

    // 1. Modificar el input title
    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "Boku no hero academia",
      }
    });

    // 2. Modificar el input body
    wrapper.find('textarea[name="body"]').simulate("change", {
      target: {
        name: "body",
        value: "Es una serie de anime basada en super heroes ...",
      }
    });

    // 3. Se espera que se dispare la acción activeNote
    //    y que halle sido llamada la segunda vez con los
    //    datos administrados
    // [ Nota: La primera vez es un efecto secundario que se dispara con useEffect en el componente ]
    expect( activeNote ).toHaveBeenLastCalledWith(
      "87s65dfsdfs57867kjb3sdf",
      {
        "body": "Es una serie de anime basada en super heroes ...",
        "date": 68732135745156616,
        "id": "87s65dfsdfs57867kjb3sdf",
        "title": "Boku no hero academia"
      }
    );
  });

});