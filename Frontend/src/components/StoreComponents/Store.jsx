import styles from "./Store.module.css";
import Product from "./Product";

const Store = () => {
  return (
    <div className={styles.storeContainer}>
      <h1>Full Stack Shop</h1>
      <div>
        <h2>Products</h2>
        <div className={styles.productsContainer}>
          <Product />
        </div>
      </div>
    </div>
  );
};

export default Store;
