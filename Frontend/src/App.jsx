import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { DashboardProvider } from "./context/DashboardContext";
import { BuyerStoreContextProvider } from "./context/BuyerStoreContext";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Store from "./components/StoreComponents/Store";
import SellerDashboard from "./components/SellerDashboard";
import StoreSetup from "./components/DashboardComponents/StoreSetup";
import Orders from "./components/DashboardComponents/Orders";
import Cart from "./components/StoreComponents/Cart";

function App() {
  return (
    <UserProvider>
      <DashboardProvider>
        <BuyerStoreContextProvider>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/store"
                element={
                  <ProtectedRoute requiredRole={"buyer"}>
                    <Store />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute requiredRole={"buyer"}>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requiredRole={"seller"}>
                    <SellerDashboard />
                  </ProtectedRoute>
                }
              >
                <Route index element={<StoreSetup />} /> {/* Default route */}
                <Route path="store-setup" element={<StoreSetup />} />
                <Route path="orders" element={<Orders />} />
              </Route>
            </Routes>
          </div>
        </BuyerStoreContextProvider>
      </DashboardProvider>
    </UserProvider>
  );
}

export default App;

/*
Buyers who can register, Login, Browse products by all sellers, Add products to cart, Checkout, View order history, View order status, Cancel order, View seller profile, View seller products
*/
