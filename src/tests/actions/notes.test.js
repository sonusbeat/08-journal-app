import configureStore from "redux-mock-store";
import thunk from "redux-thunk"
import { startNewNote } from '../../actions/notes';
import { db } from "../../firebase/firebase-config";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
  auth: {
    uid: "TESTING",
  },
});

describe("Pruebas con las acciones de notes", () => {

  test("Deberia de crear una nueva nota startNewNote", async () => {

    // 1- Dispara la acción startNewNote asincrona
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

});
