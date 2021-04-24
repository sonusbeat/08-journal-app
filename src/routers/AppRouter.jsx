import { useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import AuthRouter from "./AuthRouter";
import JournalScreen from "../components/journal/JournalScreen";
import firebase from "../firebase/firebase-config";
import { login } from "../actions/auth";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from './PublicRoute';
import { startLoadingNotes } from "../actions/notes";

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

        // Cargar Notas de Firestore
        dispatch( startLoadingNotes( user.uid ) );

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
      <h1>Wait ...</h1>
    );
  }

  return (
    <Router>
      <div>
        <Switch>

          <PublicRoute
            path="/auth"
            isLoggedIn={ isLoggedIn }
            component={ AuthRouter }
          />

          <PrivateRoute
            exact
            path="/"
            isLoggedIn={ isLoggedIn }
            component={ JournalScreen }
          />

          <Redirect to="/auth/login" />

        </Switch>
      </div>
    </Router>
  );
}

export default AppRouter;