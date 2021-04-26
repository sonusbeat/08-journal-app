import moment from "moment";
import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes"

const JournalEntry = (props) => {
  const { id, title, body, date, url } = props;
  const dispatch = useDispatch();

  // Libreria de fechas Moment.js
  const noteDate = moment(date);

  const handleEntryClick = () => {
    dispatch( activeNote( id, { title, body, date, url } ) );
  };

  return (
    <div
      className="journal__sidebar-entry pointer"
      onClick={ handleEntryClick }
    >
      {
        ( url )
          ? (
            <div
              className="journal__sidebar-picture"
              style={{ backgroundImage: `url(${ url })` }}
            ></div>
          )

          : ( <div className="journal__sidebar-svg"></div> )
      }

      <div className="journal__sidebar-body">
        <h3 className="journal__sidebar-entry-title">{ title }</h3>
        <div className="journal__sidebar-entry-content">{ body }</div>
      </div>
      <div className="journal__sidebar-entry-date-box">
        <span className="journal__sidebar-entry-date-day">{ noteDate.format('dddd') }</span>
        <p className="journal__sidebar-entry-date-number">{ noteDate.format('Do') }</p>
      </div>
    </div>
  );
}

export default JournalEntry;