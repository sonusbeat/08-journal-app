import Swal from "sweetalert2";

import { db } from "../firebase/firebase-config";
import types from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import { fileUpload } from '../helpers/fileUpload';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    try {
      // Guardar la nota en Firestore
      const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

      // Disparar la acción al reducer
      dispatch(activeNote(doc.id, newNote));

      // Agregar la nota al Redux Store
      dispatch( addNewNote(doc.id, newNote) );
    } catch(error) {
      console.log(error);
    }

  };
};

export const activeNote = (id, note) => {
  return {
    type: types.notesActive,
    payload: { id, ...note },
  };
};

const addNewNote = ( id, note ) => ({
  type: types.notesAddNew,
  payload: { id, ...note },
});

export const startLoadingNotes = (uid) => {
  return async dispatch => {
    const notes = await loadNotes(uid);

    dispatch( setNotes(notes) );
  };
};

export const setNotes = notes => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = note => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!note.url) delete note.url;

    const noteToFirestore = { ...note };

    // Eliminar el id para evitar problemas en firebase
    delete noteToFirestore.id;

    try {
      // Guardar en Firestore
      await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

      // Dispara la acción para refrescar la nota del estado
      // una vez que se halle actualizado la base de datos en Firestore
      dispatch( refreshNote( note.id, noteToFirestore ) );

      // Dispara un mensaje de exito con sweet alert
      Swal.fire("Saved", note.title, 'success');
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }

  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note
    }
  },
});

export const startUploading = ( file ) => {
  return async ( dispatch, getState ) => {

    const { active: activeNote } = getState().notes;

    Swal.fire({
      title: "Uploading ...",
      text: "Please wait ...",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    // Subir la imagen a Cloudinary
    const fileUrl = await fileUpload( file );

    dispatch(
      startSaveNote({
        ...activeNote,
        url: fileUrl
      })
    );

    Swal.close();

  };
};

export const startDeleting = ( noteId ) => {

  return async ( dispatch, getState ) => {

    const uid = getState().auth.uid;

    try {
      // Delete from Firestore
      await db.doc(`${ uid }/journal/notes/${ noteId }`).delete();

      // Delete from Redux Store
      dispatch( deleteNote( noteId ) );

      Swal.fire({
        title: "Note Deleted",
        icon: "success",
        showConfirmButton: false,
        timer: 1300,
      });

    } catch (error) {
      throw error;
    }

  };

};

export const deleteNote = ( id ) => ({
  type: types.notesDelete,
  payload: id,
});

export const noteLogout = () => ({
  type: types.notesLogoutCleaning,
});