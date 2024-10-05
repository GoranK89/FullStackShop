import { useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import styles from "./StoreSetup.module.css";
import Form from "./Form";

const StoreSetup = () => {
  const dashboardContext = useContext(DashboardContext);
  const { createStore, deleteStore, existingStores } = dashboardContext;
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

  const onDeleteHandler = (storeId) => {
    deleteStore(storeId);
  };

  const onAddProductsHandler = (storeId) => {
    // Popup modal with checkbox for each product - All products added with current user email displayed
    // Products already in store should be checked
    // send storeId to DB, add to store_ids column
    // if storeID exists in store_ids column, display as checked and render product in store
  };

  return (
    <div className={styles.storeSetupContainer}>
      <div className={styles.storeSetupForm}>
        <h2>Store Setup</h2>
        <Form
          buttonText="Create Store"
          fields={fields}
          formSubmitReq={createStore}
        />
      </div>
      <div className={styles.cratedStoresContainer}>
        <h2>Your Stores</h2>
        <div className={styles.createdStores}>
          {existingStores.map((store) => (
            <div key={store.id} className={styles.store}>
              <h3>{store.store_name}</h3>
              <p>{store.store_description}</p>
              <p>{store.store_email}</p>
              <button
                className={styles.btnAddProduct}
                onClick={() => onAddProductsHandler(store.id)}
              >
                Add Products
              </button>
              <button
                className={styles.btnDeleteStore}
                onClick={() => onDeleteHandler(store.id)}
              ></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreSetup;
