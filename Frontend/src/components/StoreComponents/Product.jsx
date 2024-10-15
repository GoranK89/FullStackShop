import styles from "./Product.module.css";

const Product = () => {
  return (
    <div className={styles.productCard}>
      <h3>Product 1</h3>
      <p>Price: $10</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default Product;
