import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import styles from "./Register.module.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const { register, serverMessage } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(email, password, userType);

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
      <div className={styles.radioButtons}>
        <div className={styles.radioOption}>
          <input
            type="radio"
            name="userType"
            value="seller"
            checked={userType === "seller"}
            onChange={(e) => setUserType(e.target.value)}
            required
          />
          <label>Seller</label>
        </div>
        <div className={styles.radioOption}>
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
      </div>
      <button type="submit" className={styles.buttonSubmit}>
        Register
      </button>
      {serverMessage && <p>{serverMessage}</p>}
    </form>
  );
}

export default Register;
