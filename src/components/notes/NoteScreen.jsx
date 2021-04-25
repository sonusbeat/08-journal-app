import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import landscape from "../../images/landscape.jpg";

import NotesAppBar from './NotesAppBar';
import useForm from '../../hooks/useForm';
import { activeNote } from '../../actions/notes';

const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector( state => state.notes );
  const [ formValues, handleInputChange, reset ] = useForm( note );
  const { title, body } = formValues;

  const activeId = useRef( note.id );

  useEffect(() => {
    if( note.id !== activeId.current ) {
      reset( note )
      activeId.current = note.id;
    }
  }, [ note, reset ]);

  useEffect(() => {
    dispatch( activeNote( formValues.id, { ...formValues } ) );
  }, [ dispatch, formValues ])

  return (
    <div className="notes">
      <div className="notes__main">
        <NotesAppBar />

        <div className="notes__content">

          <input
            className="notes__title-input"
            placeholder="Some awesome title"
            type="text"
            name="title"
            autoComplete="off"
            value={ title }
            onChange={ handleInputChange }
          />

          <textarea
            name="body"
            placeholder="What happend today ?"
            className="notes__textarea"
            value={ body }
            onChange={ handleInputChange }
          ></textarea>

          {
            ( note.url ) &&
            (
              <div className="notes__image">
                <img src={ note.url } alt="Landscape" />
              </div>
            )

          }
        </div>
      </div>
    </div>
  );
}

export default NoteScreen;