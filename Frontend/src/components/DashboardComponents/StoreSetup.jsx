import styles from "./StoreSetup.module.css";
import Form from "./Form";

const StoreSetup = () => {
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
      <Form buttonText="Save" fields={fields} />
    </div>
  );
};

export default StoreSetup;
