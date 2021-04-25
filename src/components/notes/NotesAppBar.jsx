import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote } from '../../actions/notes';

const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector( state => state.notes );

  const handleSave = () => {
    dispatch( startSaveNote( note ) );
  };

  return (
    <div className="notes__app-bar">
      <span>15 de Abril 2017</span>

      <div>
        <button className="btn">
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