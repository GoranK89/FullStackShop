import { useContext, useEffect } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import { UserContext } from "../../context/UserContext";
import styles from "./StoreSetup.module.css";
import Form from "./Form";

const StoreSetup = () => {
  const dashboardContext = useContext(DashboardContext);
  const { user } = useContext(UserContext);
  const { createStore, createdStores, getAllUserStores, deleteStore } =
    dashboardContext;
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
    getAllUserStores(user);
  };

  useEffect(() => {
    getAllUserStores(user);
    console.log("useEffect in StoreSetup component ran");
  }, [user]);

  return (
    <div className={styles.storeSetupContainer}>
      <div>
        <h2>Store Setup</h2>
        <Form
          buttonText="Create Store"
          fields={fields}
          formSubmitReq={createStore}
        />
      </div>
      <div className={styles.cratedStoresContainer}>
        <h2>Created Stores</h2>
        <div className={styles.createdStores}>
          {createdStores.map((store) => (
            <div key={store.id} className={styles.store}>
              <h3>{store.store_name}</h3>
              <p>{store.store_description}</p>
              <p>{store.store_email}</p>
              <button onClick={() => onDeleteHandler(store.id)}>DELETE</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreSetup;
