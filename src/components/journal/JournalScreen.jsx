import Sidebar from "./Sidebar";

const JournalScreen = () => {
  return (
    <div className="journal">
      <Sidebar />

      <main className="journal__main-content">
        <h1>Main Content</h1>
      </main>
    </div>
  );
}

export default JournalScreen;