import { createContext, useState } from "react";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [storeName, setStoreName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);
  const [contactEmail, setContactEmail] = useState("");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  return (
    <DashboardContext.Provider
      value={{
        storeName,
        setStoreName,
        description,
        setDescription,
        logo,
        setLogo,
        contactEmail,
        setContactEmail,
        products,
        setProducts,
        orders,
        setOrders,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
