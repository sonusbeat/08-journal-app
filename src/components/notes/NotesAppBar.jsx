import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector( state => state.notes );

  const handleSave = () => {
    dispatch( startSaveNote( note ) );
  };

  const handlePictureUpload = () => {
    document.getElementById("fileSelector").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if ( file ) {
      dispatch( startUploading( file ) );
    }
  };

  return (
    <div className="notes__app-bar">
      <span>15 de Abril 2017</span>

      <input
        id="fileSelector"
        name="image"
        type="file"
        style={{ display: "none" }}
        onChange={ handleFileChange }
      />

      <div>
        <button
          className="btn"
          onClick={ handlePictureUpload }
        >
          Picture
        </button>

        <button
          className="btn"
          onClick={ handleSave }
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default NotesAppBar;