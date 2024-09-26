import { createContext, useState } from "react";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [setupStore, setSetupStore] = useState({
    storeName: "",
    storeDescription: "",
    storeEmail: "",
  });
  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
  });
  const [orders, setOrders] = useState([]);

  return (
    <DashboardContext.Provider
      value={{
        setupStore,
        setSetupStore,
        product,
        setProduct,
        orders,
        setOrders,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
