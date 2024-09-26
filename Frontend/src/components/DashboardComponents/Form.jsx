import { useState, useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import FormField from "./FormField";

const Form = ({ buttonText, fields }) => {
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

    // TODO: replace with backend call
    console.log(`Submitting form with values: ${JSON.stringify(formState)}`);

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
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <FormField
          key={index}
          labelText={field.labelText}
          inputType={field.inputType}
          inputValue={formState[field.name]}
          onChange={(value) => handleChange(field.name, value)}
        />
      ))}
      <button type="submit" className="submitButton">
        {buttonText}
      </button>
    </form>
  );
};

export default Form;
