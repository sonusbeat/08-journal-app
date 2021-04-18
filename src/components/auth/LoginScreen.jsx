import { Link } from "react-router-dom";

const LoginScreen = () => {
  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form>

        <input
          className="auth__input"
          type="text"
          placeholder="email"
          name="email"
          autoComplete="off"
        />

        <input
          className="auth__input"
          type="password"
          placeholder="password"
          name="password"
          autoComplete="off"
        />

        <button
          className="btn btn-primary btn-block"
        >Login</button>

        <div className="auth__social-networks">

          <h4 className="auth__subtitle">Login with social networks</h4>

          <div className="google-btn">

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
