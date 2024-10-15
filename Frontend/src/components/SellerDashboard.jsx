import { Link, Outlet } from "react-router-dom";
import styles from "./SellerDashboard.module.css";

const SellerDashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sideBar}>
        <h2>Dashboard</h2>
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="store-setup" className={styles.navLink}>
                Store Setup
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="orders" className={styles.navLink}>
                Orders
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.content}>
        <Outlet /> {/* This is where the nested routes will be rendered */}
      </div>
    </div>
  );
};

export default SellerDashboard;

/*
1.) Setup their store
2.) Add products, Edit products, Delete products
3.) View Received Orders, Update Order Status (Pending, Shipped, Delivered) */
