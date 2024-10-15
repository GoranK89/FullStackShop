import { useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import Form from "./Form";
import styles from "./Products.module.css";

const Products = () => {
  const { addProduct, products, deleteProduct } = useContext(DashboardContext);

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
    {
      name: "productStock",
      labelText: "Ammount in Stock",
      inputType: "number",
    },
  ];

  const onDeleteHandler = (productId) => {
    deleteProduct(productId);
  };

  return (
    <div className={styles.productsContainer}>
      <div>
        <h2>Add your products</h2>
        <Form
          buttonText="Add Product"
          fields={fields}
          formSubmitReq={addProduct}
        />
      </div>
      <div className={styles.addedProductsContainer}>
        <h2>Your Products</h2>
        <div className={styles.createdProducts}>
          {products?.map((product) => (
            <div key={product.id} className={styles.product}>
              <h3>{product.product_name}</h3>
              <p>Description: {product.product_description}</p>
              <p>Price: {product.product_price}</p>
              <p>Ammount in stock: {product.product_stock}</p>
              <button onClick={() => onDeleteHandler(product.id)}>
                Delete Product
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
