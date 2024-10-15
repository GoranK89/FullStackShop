import { useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import styles from "./StoreSetup.module.css";
import Form from "./Form";
import Products from "./Products";

const StoreSetup = () => {
  const { createStore, existingStore, deleteStore } =
    useContext(DashboardContext);
  const storeExists = existingStore?.length > 0;

  const fields = [
    {
      name: "storeName",
      labelText: "Store Name",
      inputType: "text",
    },
    {
      name: "storeDescription",
      labelText: "Description",
      inputType: "textarea",
    },
    {
      name: "storeEmail",
      labelText: "Contact Email",
      inputType: "email",
    },
  ];

  const onStoreDelete = () => {
    deleteStore(existingStore[0].id);
  };

  // only 1 store should be created per user
  // one DB table for sellers and 1 for buyers - if possible

  return (
    <div className={styles.storeSetupContainer}>
      {!storeExists ? (
        <div className={styles.storeSetupForm}>
          <h2>My Store</h2>
          <Form
            buttonText="Create Store"
            fields={fields}
            formSubmitReq={createStore}
          />
        </div>
      ) : (
        <div className={styles.existingStore}>
          {
            <div className={styles.storeWrapper}>
              <h1>{existingStore[0].store_name}</h1>
              <p>{existingStore[0].store_description}</p>
              <p>{existingStore[0].store_email}</p>
              <button onClick={onStoreDelete}>Delete Store</button>
            </div>
          }
          {storeExists && <Products />}
        </div>
      )}
    </div>
  );
};

export default StoreSetup;
