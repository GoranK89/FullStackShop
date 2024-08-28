import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(`${data.error}`);
        }

        setServerMessage(`Logging in with: ${data.email}`);

        //TODO: redirect to content page after 1.5 seconds
        setTimeout(() => navigate("/"), 1500);
      } catch (error) {
        setServerMessage(`Error: ${error.message}`);
      }
    };

    await loginUser();

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
