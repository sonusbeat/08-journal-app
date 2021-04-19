import { Link } from "react-router-dom";
import useForm from '../../hooks/useForm';

const RegisterScreen = () => {
  const [ formValues, handleInputChange ] = useForm({
    name: "Daniel",
    email: "sonusbeat@gmail.com",
    password: "0123456789",
    password_confirmation: "0123456789",
  });

  const { name, email, password, password_confirmation } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Password Confirmation:", password_confirmation);

  };

  return (
    <>
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