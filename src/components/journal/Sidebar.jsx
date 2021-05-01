import { useDispatch, useSelector } from 'react-redux';

import JournalEntries from './JournalEntries';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector( state => state.auth );

  const handleLogout = () => {
    dispatch( startLogout() );
  };

  const HandleAddNew = () => {
    dispatch( startNewNote() );
  };

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">

        <h2 className="journal__sidebar-title">
          <i className="far fa-user mr-1"></i>
          <span>{ name }</span>
        </h2>

        <button
          id="logoutBtn"
          type="button"
          className="btn btn-primary"
          onClick={ handleLogout }
        >Logout</button>

      </div>

      <div
        id="newEntryBtn"
        className="journal__sidebar-new-entry"
        onClick={ HandleAddNew }
      >
        <i className="far fa-calendar-plus fa-5x mb-2"></i>
        <p>New Entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
}

export default Sidebar;