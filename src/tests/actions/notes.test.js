import configureStore from "redux-mock-store";
import thunk from "redux-thunk"
import { startNewNote } from '../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
  auth: {
    uid: "TESTING",
  },
});

describe("Pruebas con las acciones de notes", () => {

  test("Deberia de crear una nueva nota startNewNote", async () => {
    await store.dispatch( startNewNote() );
  });

});

