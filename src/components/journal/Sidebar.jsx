import { useDispatch } from 'react-redux';
import JournalEntries from './JournalEntries';
import { startLogout } from '../../actions/auth';

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch( startLogout() );
  };

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">

        <h2 className="journal__sidebar-title">
          <i className="far fa-user mr-1"></i>
          <span>Daniel</span>
        </h2>

        <button
          type="button"
          className="btn btn-primary"
          onClick={ handleLogout }
        >Logout</button>

      </div>

      <div className="journal__sidebar-new-entry">
        <i className="far fa-calendar-plus fa-5x mb-2"></i>
        <p>New Entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
}

export default Sidebar;