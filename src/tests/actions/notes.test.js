 /**
 * @jest-environment node
 */

import configureStore from "redux-mock-store";
import thunk from "redux-thunk"
import { db } from "../../firebase/firebase-config";
import types from "../../types/types";
import { startNewNote, startLoadingNotes, startSaveNote } from '../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {
    uid: "TESTING",
  },
};

let store = mockStore( initialState );

describe("Pruebas con las acciones de notes", () => {

  beforeEach(() => store = mockStore( initialState ));

  test("Deberia de crear una nueva nota startNewNote", async () => {

    // 1- Dispara la acción startNewNote asíncrona
    await store.dispatch( startNewNote() );

    // 2- Obtenemos las acciones del store en un arreglo
    const actions = store.getActions();

    // 3- Obtenemos del store el user id
    const uid = store.getState().auth.uid;

    // 4- Llamamos del arreglo de acciones
    //    el id del payload y lo almacenamos en una variable
    const noteId = actions[1].payload.id;

    // 5- Se elimina la nota previamente creada al llamar las acciones en el paso 1
    await db.doc(`${ uid }/journal/notes/${ noteId }`).delete();

  });

  test("Deberia de cargar las notas", async () => {

    // 1. Obtener el UID del Mock Store
    const uid = store.getState().auth.uid;

    // 2. Disparar la acción asíncrona
    await store.dispatch( startLoadingNotes( uid ) );

    // 3. Obtener las acciones
    const actions = store.getActions();

    // 4. Revizar si una acción es igual a lo
    //    que se especifica en el objeto.
    expect( actions[0] ).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array)
    });

    // 5. Se crea un objeto con las propiedades esperadas
    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      // title: 'Boku no hero',
      body: expect.any(String),
      date: expect.any(Number),
    };

    // Se compara el objeto del payload que coincida con el objeto anterior
    expect( actions[0].payload[0] ).toMatchObject( expected );
  });

  test("Debería de actualizar la nota la acción startSaveNote", async () => {

    // 1. Creamos el objeto con un id existente y las propiedades que
    //    queremos cambiar en este caso es el title y el body
    const note = {
      id: "YOoOF6L2aDmmc67mE93H",
      title: "Boku no hero academia",
      body: "Es una serie de anime de estudiantes aspirantes a ser heroes",
    };

    // 2. Disparamos la acción para actualizar el objeto en firebase
    await store.dispatch( startSaveNote( note ) );

    // 3. Obtenemos las acciones del mock del store
    const actions = store.getActions();

    // 4. Probamos que de las acciones el indice 0 del arreglo
    //    que su propiedad type coincida con los el type notesUpdated
    expect( actions[0].type ).toBe( types.notesUpdated );

    // 5. Se extrae la referencia de firestore
    const docRef = await db.doc(`/TESTING/journal/notes/${ note.id }`).get();

    // 6. Se reviza que de la referencia su propiedad title del objeto
    //    coincida con title de la nota
    expect( docRef.data().title ).toEqual( note.title );

    // 7. Se reviza que de la referencia su propiedad body del objeto
    //    coincida con body de la nota
    expect( docRef.data().body ).toEqual( note.body );

  });

});
