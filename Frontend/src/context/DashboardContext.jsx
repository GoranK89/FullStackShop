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
  const { user } = useContext(UserContext);

  const { apiRequest, loading, error } = useApi();
  const [serverMessage, setServerMessage] = useState("");
  const [existingStores, setExistingStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const createStore = async (storeData) => {
    try {
      const data = await apiRequest(
        "http://localhost:5000/stores",
        "POST",
        storeData
      );

      setExistingStores((prevStores) => {
        // Check if the new data is different from the current state
        const newStores = data.allUserStores.filter(
          (store) => !prevStores.some((prevStore) => prevStore.id === store.id)
        );
        if (newStores.length > 0) {
          return [...prevStores, ...newStores];
        }
        return prevStores;
      });

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
    getAllStores(user);
    console.log("Getting all stores from DashboardContext");
  }, [user, getAllStores]);

  const deleteStore = async (storeId) => {
    const userEmail = user;

    try {
      const data = await apiRequest(
        `http://localhost:5000/stores?storeId=${storeId}&userEmail=${userEmail}`,
        "DELETE"
      );

      // Update the existingStores state to remove the deleted store
      setExistingStores((prevStores) =>
        prevStores.filter((store) => store.id !== storeId)
      );

      setExistingStores(data.allUserStores);
      setServerMessage(`${data.message}`);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  };

  // TODO: REVORK like the store functions - easier for state management
  const addProduct = async (productData) => {
    try {
      const data = await apiRequest(
        "http://localhost:5000/addProduct",
        "POST",
        productData
      );
      getAllProducts();
      setServerMessage(`${data.message}`);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  };

  const getAllProducts = async () => {
    try {
      const data = await apiRequest("http://localhost:5000/addProduct", "GET");
      setProducts(data);
      setServerMessage(`${data.message}`);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const data = await apiRequest(
        `http://localhost:5000/addProduct?productId=${productId}`,
        "DELETE"
      );
      getAllProducts();
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
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
