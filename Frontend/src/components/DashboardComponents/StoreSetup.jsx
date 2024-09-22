import { useContext } from "react";
import styles from "./StoreSetup.module.css";
import { DashboardContext } from "../../context/DashboardContext";

const StoreSetup = () => {
  const {
    storeName,
    setStoreName,
    description,
    setDescription,
    contactEmail,
    setContactEmail,
  } = useContext(DashboardContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("submitting form");
  };

  return (
    <div className={styles.storeSetupContainer}>
      <h2>Store Setup</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Store Name</label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Store Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Contact Email</label>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="submitButton">
          Save
        </button>
      </form>
    </div>
  );
};

export default StoreSetup;
