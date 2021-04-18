import { Link } from "react-router-dom";

const RegisterScreen = () => {
  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form>

        <input
          className="auth__input"
          type="text"
          placeholder="name"
          name="name"
          autoComplete="off"
        />

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

        <input
          className="auth__input"
          type="password"
          placeholder="Confirm password"
          name="password_confirm"
          autoComplete="off"
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