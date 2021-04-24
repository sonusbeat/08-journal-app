const types = {
  // Autentication
  login: "[Auth] Login",
  logout: "[Auth] Logout",

  // Errors
  uiSetError: "[UI] Set Error",
  uiRemoveError: "[UI] Remove Error",

  // Loading State
  uiStartLoading: "[UI] Start loading",
  uiFinishLoading: "[UI] Finish loading",

  // Notes
  notesAddNew:         "[Notes] Note Added",
  notesActive:         "[Notes] Note Activated",
  notesLoad:           "[Notes] Entries Loaded",
  notesUpdated:        "[Notes] Updated note",
  notesFileUrl:        "[Notes] Updated image url",
  notesDelete:         "[Notes] Deleted note",
  notesLogoutCleaning: "[Notes] Logged out cleaned",

};

export default types;