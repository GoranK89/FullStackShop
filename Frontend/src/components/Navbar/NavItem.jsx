import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const NavItem = ({ path, label }) => {
  return (
    <li className={styles.navItem}>
      <Link to={path} className={styles.navLink}>
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
