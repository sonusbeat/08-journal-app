import NotesAppBar from './NotesAppBar';
import landscape from "../../images/landscape.jpg";

const NoteScreen = () => {
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
          />

          <textarea
            name=""
            placeholder="What happend today ?"
            className="notes__textarea"
          ></textarea>

          <div className="notes__image">
            <img src={ landscape } alt="Landscape" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteScreen;