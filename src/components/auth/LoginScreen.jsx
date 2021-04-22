import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useForm from '../../hooks/useForm';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { setError, unsetError } from '../../actions/ui';
import validator from "validator";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { msgError, loading } = useSelector( state => state.ui );

  const [ formValues, handleInputChange ] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const isFormValid = () => {
    if ( validator.isEmpty( email ) ) {
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
    }

    dispatch( unsetError() );

    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if( isFormValid() ) {
      dispatch( startLoginEmailPassword( email, password ) );
    }
  };

  const handleGoogleLogin = () => {
    dispatch( startGoogleLogin() );
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

      <h3 className="auth__title">Login</h3>

      <form onSubmit={ handleLogin }>

        <input
          name="email"
          value={ email }
          className="auth__input"
          type="text"
          placeholder="email"
          autoComplete="off"
          autofill="off"
          onChange={ handleInputChange }
        />

        <input
          name="password"
          value={ password }
          className="auth__input"
          type="password"
          placeholder="password"
          autoComplete="off"
          autofill="off"
          onChange={ handleInputChange }
        />

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={ loading }
        >Login</button>

        <div className="auth__social-networks">

          <h4 className="auth__subtitle">Login with social networks</h4>

          <div
            className="google-btn"
            onClick={ handleGoogleLogin }
          >

            <div className="google-icon-wrapper">
                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>

            <p className="btn-text">
              <b>Sign in with google</b>
            </p>

          </div>

          <Link className="auth__link link" to="/auth/register">
            Create new account
          </Link>

        </div>

      </form>
    </>
  );
};

export default LoginScreen;
