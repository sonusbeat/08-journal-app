import { useSelector } from 'react-redux';
import NotesAppBar from './NotesAppBar';
// import landscape from "../../images/landscape.jpg";
import useForm from '../../hooks/useForm';

const NoteScreen = () => {
  const { active: note } = useSelector( state => state.notes );

  const [ formValues, handleInputChange ] = useForm( note );

  const { title, body } = formValues;

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
            name=""
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