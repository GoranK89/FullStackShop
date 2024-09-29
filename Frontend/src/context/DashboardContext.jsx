import { createContext, useState } from "react";
import useApi from "../hooks/useApi";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { apiRequest, loading, error } = useApi();
  const [serverMessage, setServerMessage] = useState("");
  const [createdStores, setCreatedStores] = useState([]);

  const [setupStore, setSetupStore] = useState({
    storeName: "",
    storeDescription: "",
    storeEmail: "",
  });
  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productStock: "",
  });
  const [orders, setOrders] = useState([]);

  const createStore = async (storeData) => {
    try {
      const data = await apiRequest(
        "http://localhost:5000/stores",
        "POST",
        storeData
      );
      setServerMessage(`${data.message}`);
      console.log(data);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  };

  const getAllUserStores = async (userEmail) => {
    try {
      const data = await apiRequest(
        `http://localhost:5000/stores?userEmail=${userEmail}`,
        "GET"
      );
      setCreatedStores(data);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  };

  const deleteStore = async (storeId) => {
    try {
      const data = await apiRequest(
        `http://localhost:5000/stores?storeId=${storeId}`,
        "DELETE"
      );
      setServerMessage(`${data.message}`);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  };

  const addProduct = async (productData) => {
    try {
      const data = await apiRequest(
        "http://localhost:5000/addProduct",
        "POST",
        productData
      );
      setServerMessage(`${data.message}`);
      console.log(data);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        setupStore,
        setSetupStore,
        product,
        setProduct,
        orders,
        setOrders,
        createStore,
        addProduct,
        getAllUserStores,
        createdStores,
        deleteStore,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
