import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import useForm from '../../hooks/useForm';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const [ formValues, handleInputChange ] = useForm({
    email: "qbixmex@gmail.com",
    password: "secretodivino",
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch( startLoginEmailPassword(email, password) );
  };

  const handleGoogleLogin = () => {
    dispatch( startGoogleLogin() );
  };


  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form onSubmit={ handleLogin }>

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
          name="password"
          value={ password }
          className="auth__input"
          type="password"
          placeholder="password"
          autoComplete="off"
          onChange={ handleInputChange }
        />

        <button
          className="btn btn-primary btn-block"
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
