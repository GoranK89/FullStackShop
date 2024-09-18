import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, serverMessage } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <h1>Login</h1>
      <input
        type="email"
        name="email"
        placeholder="your.email@mail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className={styles.buttonSubmit}>
        Login
      </button>
      {serverMessage && <p>{serverMessage}</p>}
    </form>
  );
}

export default Login;
