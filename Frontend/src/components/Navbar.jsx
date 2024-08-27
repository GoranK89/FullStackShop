import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <header>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/register" className={styles.navLink}>
              Register
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/login" className={styles.navLink}>
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
