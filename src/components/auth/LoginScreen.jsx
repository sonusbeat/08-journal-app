const LoginScreen = () => {
  return (
    <>
      <h3>Login</h3>

      <form>

        <input
          type="text"
          placeholder="email"
          name="email"
        />

        <input
          type="password"
          placeholder="password"
          name="password"
        />

        <button>Login</button>

        <hr />

        <p>Google</p>

      </form>
    </>
  );
};

export default LoginScreen;
