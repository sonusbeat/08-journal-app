import AppRouter from "./routers/AppRouter";
import { Provider } from "react-redux";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";

import store from './store/store';

const JournalApp = () => {
  return (
    <Provider store={ store }>
      <AppRouter />
    </Provider>
  );
}

export default JournalApp;