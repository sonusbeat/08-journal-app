import moment from "moment";

const JournalEntry = (props) => {
  const { title, body, date, url } = props;

  const noteDate = moment(date);

  return (
    <div className="journal__sidebar-entry pointer">
      {
        ( url )
          ? (
            <div
              className="journal__sidebar-picture"
              style={{ backgroundImage: `url(${ url })` }}
            ></div>
          )

          : ( <div className="journal__sidebar-picture"></div> )
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