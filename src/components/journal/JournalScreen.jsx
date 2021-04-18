import Sidebar from "./Sidebar";
// import NothingSelected from './NothingSelected';

const JournalScreen = () => {
  return (
    <div className="journal">
      <Sidebar />

      <main className="journal__main-content">
        {/* <NothingSelected /> */}
      </main>
    </div>
  );
};

export default JournalScreen;