import { useContext, useState } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import { UserContext } from "../../context/UserContext";
import styles from "./StoreSetup.module.css";
import Form from "./Form";
import Modal from "../Modal/Modal";

const StoreSetup = () => {
  const {
    createStore,
    deleteStore,
    existingStores,
    getAllProducts,
    products,
    addProductToStore,
  } = useContext(DashboardContext);
  const { user: userEmail } = useContext(UserContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState({ id: null, name: "" });
  const [selectedProducts, setSelectedProducts] = useState([]);

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

  const onAddProductsHandler = async (storeId, storeName) => {
    // Popup modal with checkbox for each product - All products added with current user email displayed
    setSelectedStore({ id: storeId, name: storeName });
    setIsModalOpen(true);
    // Products already in store should be checked
    await getAllProducts(userEmail);
    // send storeId to DB, add to store_ids column
    // if storeID exists in store_ids column, display as checked and render product in store
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStore({ id: null, name: "" });
  };

  const onCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setSelectedProducts((prevSelectedProducts) => {
      if (checked) {
        return [...prevSelectedProducts, id];
      } else {
        return prevSelectedProducts.filter((productId) => productId !== id);
      }
    });
  };

  const onAddSelectedHandler = (e) => {
    e.preventDefault();
    console.log(
      `Sending to store ID: ${selectedStore.id} products: `,
      selectedProducts
    );
    addProductToStore(selectedStore.id, selectedProducts);
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
                onClick={() => onAddProductsHandler(store.id, store.store_name)}
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
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Add Products to Store</h2>
        <p>You will add products for store: {selectedStore.name}</p>
        <form onSubmit={onAddSelectedHandler}>
          {products.map((product) => (
            <div key={product.id}>
              <input
                type="checkbox"
                id={product.id}
                name={product.product_name}
                onChange={onCheckboxChange}
              />
              <label htmlFor={product.id}>{product.product_name}</label>
            </div>
          ))}
          <button type="submit">Add Selected</button>
        </form>
      </Modal>
    </div>
  );
};

export default StoreSetup;
