import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.titleContainer}>
      <h1>Welcome to the Full Stack Shop</h1>
      <p>Create an account to check our top secret stock</p>
    </div>
  );
}

export default Home;
