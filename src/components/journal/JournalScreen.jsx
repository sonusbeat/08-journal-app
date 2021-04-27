import { useSelector } from "react-redux";

import Sidebar from "./Sidebar";
import NothingSelected from './NothingSelected';
import NoteScreen from '../notes/NoteScreen';

const JournalScreen = () => {

  const { active } = useSelector(state => state.notes );

  return (
    <div className="journal animate__animated animate__fadeIn animate__faster">

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