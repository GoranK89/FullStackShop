import styles from "./Store.module.css";
import Product from "./Product";
import { useContext } from "react";
import { BuyerStoreContext } from "../../context/BuyerStoreContext";

const Store = () => {
  // TODO: create a query in Backend to get all products from all stores
  // render them here
  // add a button to add to cart
  // display added products in cart
  // checkout button to checkout
  // update the quantity of the product in the cart
  // display the orded in seller dashboard

  const { getAllProducts } = useContext(BuyerStoreContext);

  // gets called to often
  // getAllProducts();

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
