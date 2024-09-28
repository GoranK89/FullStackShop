import { useState, useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import { UserContext } from "../../context/UserContext";
import FormField from "./FormField";
import styles from "./Form.module.css";

const Form = ({ buttonText, fields, formSubmitReq }) => {
  const { user } = useContext(UserContext);
  const { setSetupStore, setProduct } = useContext(DashboardContext);
  const [formState, setFormState] = useState({
    storeName: "",
    storeDescription: "",
    storeEmail: "",
    productName: "",
    productDescription: "",
    productPrice: "",
  });

  const handleChange = (name, value) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formState.storeName && !formState.productName) return;

    // Update the context state with the form values
    setSetupStore((prevSetupStore) => ({
      ...prevSetupStore,
      storeName: formState.storeName,
      storeDescription: formState.storeDescription,
      storeEmail: formState.storeEmail,
    }));

    setProduct((prevProduct) => ({
      ...prevProduct,
      productName: formState.productName,
      productDescription: formState.productDescription,
      productPrice: formState.productPrice,
    }));

    // hacky and simple way to check if the form is for store or product
    if (formState.storeName !== "") {
      formSubmitReq({
        userEmail: user,
        storeName: formState.storeName,
        storeDescription: formState.storeDescription,
        storeEmail: formState.storeEmail,
      });
    }
    if (formState.productName !== "") {
      formSubmitReq({
        userEmail: user,
        productName: formState.productName,
        productDescription: formState.productDescription,
        productPrice: formState.productPrice,
      });
    }

    setFormState((prevFormState) => ({
      ...prevFormState,
      storeName: "",
      storeDescription: "",
      storeEmail: "",
      productName: "",
      productDescription: "",
      productPrice: "",
    }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <FormField
          key={index}
          labelText={field.labelText}
          inputType={field.inputType}
          inputValue={formState[field.name]}
          onChange={(value) => handleChange(field.name, value)}
        />
      ))}
      <button type="submit" className={styles.submitButton}>
        {buttonText}
      </button>
    </form>
  );
};

export default Form;
