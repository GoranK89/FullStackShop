import { useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import styles from "./StoreSetup.module.css";
import Form from "./Form";

const StoreSetup = () => {
  const dashboardContext = useContext(DashboardContext);
  const { createStore } = dashboardContext;
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

  return (
    <div className={styles.storeSetupContainer}>
      <h2>Store Setup</h2>
      <Form buttonText="Save" fields={fields} formSubmitReq={createStore} />
    </div>
  );
};

export default StoreSetup;
