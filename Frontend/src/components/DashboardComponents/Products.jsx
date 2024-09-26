import { useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import Form from "./Form";
import styles from "./Products.module.css";

const Products = () => {
  const { products } = useContext(DashboardContext);

  const fields = [
    {
      name: "productName",
      labelText: "Product Name",
      inputType: "text",
      inputValue: products,
    },
    {
      name: "productDescription",
      labelText: "Product Description",
      inputType: "textarea",
      inputValue: products,
    },
    {
      name: "productPrice",
      labelText: "Product Price",
      inputType: "number",
      inputValue: products,
    },
  ];

  return (
    <div className={styles.productsContainer}>
      <h2>Add your products</h2>
      <Form buttonText="Add Product" fields={fields} />
    </div>
  );
};

export default Products;
