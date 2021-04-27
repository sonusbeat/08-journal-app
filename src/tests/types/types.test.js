import types from "../../types/types";

describe("Pruebas con los tipos", () => {
  test("Debe tener los tipos especificados", () => {
    expect(types).toMatchObject({
      login: "[Auth] Login",
      logout: "[Auth] Logout",
      uiSetError: "[UI] Set Error",
      uiRemoveError: "[UI] Remove Error",
      uiStartLoading: "[UI] Start loading",
      uiFinishLoading: "[UI] Finish loading",
      notesAddNew: "[Notes] Note Added",
      notesActive: "[Notes] Note Activated",
      notesLoad: "[Notes] Entries Loaded",
      notesUpdated: "[Notes] Updated note",
      notesFileUrl: "[Notes] Updated image url",
      notesDelete: "[Notes] Deleted note",
      notesLogoutCleaning: "[Notes] Logged out cleaned",
    });
  });
});
