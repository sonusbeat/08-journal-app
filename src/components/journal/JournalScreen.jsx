import Sidebar from "./Sidebar";
// import NothingSelected from './NothingSelected';
import NoteScreen from '../notes/NoteScreen';

const JournalScreen = () => {
  return (
    <div className="journal">
      <Sidebar />

      <main className="journal__main-content">
        {/* <NothingSelected /> */}
        <NoteScreen />
      </main>
    </div>
  );
};

export default JournalScreen;