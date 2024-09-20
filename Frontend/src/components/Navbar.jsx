import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import styles from "./Navbar.module.css";

function Navbar() {
  const { user, accessToken, logout, userType } = useContext(UserContext);

  return (
    <header>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          {!user && !accessToken && (
            <li className={styles.navItem}>
              <Link to="/register" className={styles.navLink}>
                Register
              </Link>
            </li>
          )}
          {accessToken && userType === "seller" && (
            <li className={styles.navItem}>
              <Link to="/dashboard" className={styles.navLink}>
                Dashboard
              </Link>
            </li>
          )}
          {accessToken && userType === "buyer" && (
            <li className={styles.navItem}>
              <Link to="/store" className={styles.navLink}>
                Store
              </Link>
            </li>
          )}
          {!user && !accessToken && (
            <li className={styles.navItem}>
              <Link to="/login" className={styles.navLink}>
                Login
              </Link>
            </li>
          )}
          {(user || accessToken) && (
            <li className={styles.navItem}>
              <button onClick={logout} className={styles.logoutBtn}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
