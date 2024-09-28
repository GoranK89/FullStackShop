import { useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import Form from "./Form";
import styles from "./Products.module.css";

const Products = () => {
  const { addProduct } = useContext(DashboardContext);

  const fields = [
    {
      name: "productName",
      labelText: "Product Name",
      inputType: "text",
    },
    {
      name: "productDescription",
      labelText: "Product Description",
      inputType: "textarea",
    },
    {
      name: "productPrice",
      labelText: "Product Price",
      inputType: "number",
    },
  ];

  return (
    <div className={styles.productsContainer}>
      <h2>Add your products</h2>
      <Form
        buttonText="Add Product"
        fields={fields}
        formSubmitReq={addProduct}
      />
    </div>
  );
};

export default Products;
