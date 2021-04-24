import { useSelector } from "react-redux";

import Sidebar from "./Sidebar";
import NothingSelected from './NothingSelected';
import NoteScreen from '../notes/NoteScreen';

const JournalScreen = () => {

  const { active } = useSelector(state => state.notes );

  return (
    <div className="journal">

      <Sidebar />

      <main className="journal__main-content">
        {
          ( active )
          ? ( <NoteScreen /> )
          : ( <NothingSelected /> )
        }
      </main>
    </div>
  );
};

export default JournalScreen;