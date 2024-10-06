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
  const [existingStores, setExistingStores] = useState([]);
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

      setExistingStores(data.allUserStores);
      setServerMessage(`${data.message}`);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  };

  // useCallback to prevent infinite useEffect loop
  const getAllStores = useCallback(async (userEmail) => {
    try {
      const data = await apiRequest(
        `http://localhost:5000/stores?userEmail=${userEmail}`,
        "GET"
      );
      setExistingStores(data.allUserStores);
      setServerMessage(`${data.message}`);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  }, []);

  // Get all stores on initial render
  useEffect(() => {
    getAllStores(userEmail);
    console.log("Getting all STORES from DashboardContext");
  }, [userEmail, getAllStores]);

  const deleteStore = async (storeId) => {
    try {
      const data = await apiRequest(
        `http://localhost:5000/stores?storeId=${storeId}&userEmail=${userEmail}`,
        "DELETE"
      );

      setExistingStores(data.allUserStores);
      setServerMessage(`${data.message}`);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  };

  const addProductToStore = async (storeId, productData) => {
    try {
      //
      const data = await apiRequest(
        `http://localhost:5000/products/${storeId}/add-product-to-store`,
        "POST",
        productData
      );
      console.log(data);
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
      console.log(data.allUserProducts);
      setServerMessage(`${data.message}`);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  }, []);

  useEffect(() => {
    getAllProducts(userEmail);
    console.log("Getting all PRODUCTS from DashboardContext");
  }, [userEmail, getAllProducts]);

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

  return (
    <DashboardContext.Provider
      value={{
        products,
        setProducts,
        orders,
        setOrders,
        createStore,
        getAllStores,
        addProduct,
        existingStores,
        setExistingStores,
        deleteStore,
        getAllProducts,
        deleteProduct,
        addProductToStore,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
