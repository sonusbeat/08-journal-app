import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import useForm from '../../hooks/useForm';
import { setError, unsetError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from "../../actions/auth";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector(state => state.ui);

  const [ formValues, handleInputChange ] = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const { name, email, password, password_confirmation } = formValues;

  const isFormValid = () => {
    if ( validator.isEmpty( name ) ) {
      dispatch( setError("Name should be present !") );
      return false;
    } else if ( name.trim().length <= 2) {
      dispatch( setError("Name should be greater than 2 characters !") );
      return false;
    } else if ( validator.isEmpty( email ) ) {
      dispatch( setError("Email should be present !") );
      return false;
    } else  if ( !validator.isEmail( email ) ) {
      dispatch( setError("Email format not valid !") );
      return false;
    } else  if ( validator.isEmpty( password ) ) {
      dispatch( setError("Password should be present !") );
      return false;
    } else  if ( password.trim().length < 8 ) {
      dispatch( setError("Password should be greater than 8 characters !") );
      return false;
    } else  if ( validator.isEmpty( password_confirmation ) ) {
      dispatch( setError("Password confirmation should be present !") );
      return false;
    } else  if ( password_confirmation.trim().length < 8 ) {
      dispatch( setError("Password confirmation should be greater than 8 characters !") );
      return false;
    } else  if ( password !== password_confirmation ) {
      dispatch( setError("Password and Password confirmation should be match each other !") );
      return false;
    }

    dispatch( unsetError() );

    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if ( isFormValid() ) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  return (
    <>
      {
        msgError &&
        (
          <div className="auth__alert-error mb-2 text-center">
            { msgError }
          </div>
        )
      }

      <h3 className="auth__title">Register</h3>

      <form onSubmit={ handleRegister }>

        <input
          name="name"
          value={ name }
          className="auth__input"
          type="text"
          placeholder="name"
          autoComplete="off"
          onChange={ handleInputChange }
        />

        <input
          name="email"
          value={ email }
          className="auth__input"
          type="text"
          placeholder="email"
          autoComplete="off"
          onChange={ handleInputChange }
        />

        <input
          type="password"
          value={ password }
          className="auth__input"
          placeholder="password"
          name="password"
          autoComplete="off"
          onChange={ handleInputChange }
        />

        <input
          name="password_confirmation"
          value={ password_confirmation }
          className="auth__input"
          type="password"
          placeholder="Confirm password"
          autoComplete="off"
          onChange={ handleInputChange }
        />

        <button
          className="btn btn-primary btn-block"
        >Register</button>

          <Link className="auth__link link" to="/auth/login">
            Already Registered ?
          </Link>
      </form>
    </>
  );
}

export default RegisterScreen;