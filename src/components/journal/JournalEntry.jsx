const JournalEntry = () => {
  return (
    <div className="journal__sidebar-entry pointer">
      <div className="journal__sidebar-picture"></div>
      <div className="journal__sidebar-body">
        <h3 className="journal__sidebar-entry-title">Un nuevo día</h3>
        <div className="journal__sidebar-entry-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, delectus.</div>
      </div>
      <div className="journal__sidebar-entry-date-box">
        <span className="journal__sidebar-entry-date-day">Monday</span>
        <p className="journal__sidebar-entry-date-number">28</p>
      </div>
    </div>
  );
}

export default JournalEntry;