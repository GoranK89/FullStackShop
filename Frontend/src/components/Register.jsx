import { useState } from "react";
import styles from "./Register.module.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registerUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, userType }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(`${data.error}`);
        }

        setServerMessage(`${data.message}`);
      } catch (error) {
        setServerMessage(`Error: ${error.message}`);
      }
    };

    await registerUser();

    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.registerForm}>
      <h1>Register</h1>
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
      <div>
        <input
          type="radio"
          name="userType"
          value="seller"
          checked={userType === "seller"}
          onChange={(e) => setUserType(e.target.value)}
          required
        />
        <label>Seller</label>
        <input
          type="radio"
          name="userType"
          value="buyer"
          checked={userType === "buyer"}
          onChange={(e) => setUserType(e.target.value)}
          required
        />
        <label>Buyer</label>
      </div>
      <button type="submit">Register</button>
      {serverMessage && <p>{serverMessage}</p>}
    </form>
  );
}

export default Register;
