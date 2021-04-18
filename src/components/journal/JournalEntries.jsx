import JournalEntry from './JournalEntry';

const JournalEntries = () => {

  const entries = [];

  for(let i = 1; i <= 5; i++) {
    entries.push(i);
  }

  return (
    <div className="journal__sidebar-entries">
      {
        entries.map( value => (
          <JournalEntry key={ value } />
        ))
      }
    </div>
  );
}

export default JournalEntries;