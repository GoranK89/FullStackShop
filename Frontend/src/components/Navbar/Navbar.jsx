import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import NavItem from "./NavItem";
import styles from "./Navbar.module.css";

const navConfig = [
  {
    path: "/",
    label: "Home",
    roles: ["guest", "buyer", "seller"], // Accessible by all roles
  },
  {
    path: "/register",
    label: "Register",
    roles: ["guest"], // Accessible only by guests
  },
  {
    path: "/login",
    label: "Login",
    roles: ["guest"], // Accessible only by guests
  },
  {
    path: "/store",
    label: "Store",
    roles: ["buyer"], // Accessible only by buyers
  },
  {
    path: "/dashboard",
    label: "Dashboard",
    roles: ["seller"], // Accessible only by sellers
  },
  {
    path: "/cart",
    label: "Cart",
    roles: ["buyer"], // Accessible only by buyers
  },
];

function Navbar() {
  const { user, accessToken, logout, userType } = useContext(UserContext);

  const getNavItems = () => {
    return navConfig.map((navItem) => {
      if (navItem.roles.includes("guest") && !user && !accessToken) {
        return (
          <NavItem
            key={navItem.path}
            path={navItem.path}
            label={navItem.label}
          />
        );
      }
      if (navItem.roles.includes(userType) && accessToken) {
        return (
          <NavItem
            key={navItem.path}
            path={navItem.path}
            label={navItem.label}
          />
        );
      }
      return null;
    });
  };

  return (
    <header>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          {getNavItems()}
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
