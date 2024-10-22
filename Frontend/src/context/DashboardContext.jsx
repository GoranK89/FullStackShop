import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import { UserContext } from "./UserContext";
import useApi from "../hooks/useApi";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { user: userEmail } = useContext(UserContext);

  const { apiRequest, loading, error } = useApi();
  const [serverMessage, setServerMessage] = useState("");
  const [existingStore, setExistingStore] = useState({});
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // STORES
  const createStore = async (storeData) => {
    try {
      const data = await apiRequest(
        "http://localhost:5000/stores",
        "POST",
        storeData
      );

      setExistingStore(data.allUserStores);
      getSellersStore(userEmail);
      setServerMessage(`${data.message}`);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  };

  // useCallback to prevent infinite useEffect loop
  const getSellersStore = useCallback(async (userEmail) => {
    try {
      const data = await apiRequest(
        `http://localhost:5000/stores?userEmail=${userEmail}`,
        "GET"
      );
      setExistingStore(data.allUserStores);
      setServerMessage(`${data.message}`);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  }, []);

  const deleteStore = async (storeId) => {
    try {
      // Delete store and associated products (userEmail nedeed to delete relevat products)
      const data = await apiRequest(
        `http://localhost:5000/stores?storeId=${storeId}&userEmail=${userEmail}`,
        "DELETE"
      );

      setExistingStore({});
      setProducts([]);
      setServerMessage(`${data.message}`);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  };

  // PRODUCTS
  const addProduct = async (productData) => {
    try {
      const data = await apiRequest(
        `http://localhost:5000/products?userEmail=${userEmail}`,
        "POST",
        productData
      );
      setProducts(data.allUserProducts);
      setServerMessage(`${data.message}`);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  };

  const getAllProducts = useCallback(async (userEmail) => {
    try {
      const data = await apiRequest(
        `http://localhost:5000/products?userEmail=${userEmail}`,
        "GET"
      );
      setProducts(data.allUserProducts);
      setServerMessage(`${data.message}`);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  }, []);

  const deleteProduct = async (productId) => {
    try {
      const data = await apiRequest(
        `http://localhost:5000/products?productId=${productId}&userEmail=${userEmail}`,
        "DELETE"
      );
      setProducts(data.allUserProducts);
      setServerMessage(`${data.message}`);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  };

  // Get all stores and products on initial render
  useEffect(() => {
    getSellersStore(userEmail);
    console.log("Getting all STORES from DashboardContext");
  }, [userEmail, getSellersStore]);

  useEffect(() => {
    getAllProducts(userEmail);
    console.log("Getting all PRODUCTS from DashboardContext");
  }, [userEmail, getAllProducts]);

  return (
    <DashboardContext.Provider
      value={{
        createStore,
        existingStore,
        setExistingStore,
        getSellersStore,
        deleteStore,
        products,
        setProducts,
        orders,
        setOrders,
        addProduct,
        getAllProducts,
        deleteProduct,
        serverMessage,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
