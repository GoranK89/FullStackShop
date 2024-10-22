import { createContext, useCallback } from "react";
import useApi from "../hooks/useApi";

export const BuyerStoreContext = createContext();

export const BuyerStoreContextProvider = ({ children }) => {
  const { apiRequest, loading, error } = useApi();

  const getAllProducts = async () => {
    try {
      const data = await apiRequest(
        `http://localhost:5000/products/all`,
        "GET"
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BuyerStoreContext.Provider value={{ getAllProducts }}>
      {children}
    </BuyerStoreContext.Provider>
  );
};
