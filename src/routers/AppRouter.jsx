import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { useDispatch } from "react-redux";

import AuthRouter from "./AuthRouter";
import JournalScreen from "../components/journal/JournalScreen";
import firebase from "../firebase/firebase-config";
import login from "../actions/auth";

const AppRouter = () => {

  const dispatch = useDispatch();

  const [ checking, setChecking ] = useState(true);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged( (user) => {

      // Obtener los datos del usuario si el usuario ha sido autenticado
      if (user?.uid) {
        // Disparar la acción login con el dispatch
        dispatch( login(user.uid, user.displayName) );

        // Ajustar el Logged In en VERDADERO para las rutas privadas y publicas
        setIsLoggedIn( true );
      } else {
        // Ajustar el Logged In en FALSO SI NO esta autenticado para las rutas privadas y publicas
        setIsLoggedIn( false );
      }

      // Colocar el checking en false
      // SOLO SI se obtienen los datos del usuario por Firebase
      setChecking(false);

    });
  }, [ dispatch, setChecking, setIsLoggedIn ]);

  if ( checking ) {
    return (
      <h1>Espere ...</h1>
    );
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/auth" component={ AuthRouter } />
          <Route exact path="/" component={ JournalScreen } />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
}

export default AppRouter;