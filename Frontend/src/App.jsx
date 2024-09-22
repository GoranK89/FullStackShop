import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { DashboardProvider } from "./context/DashboardContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Store from "./components/Store";
import SellerDashboard from "./components/SellerDashboard";
import StoreSetup from "./components/DashboardComponents/StoreSetup";
import Products from "./components/DashboardComponents/Products";
import Orders from "./components/DashboardComponents/Orders";

function App() {
  return (
    <UserProvider>
      <DashboardProvider>
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
              path="/dashboard"
              element={
                <ProtectedRoute requiredRole={"seller"}>
                  <SellerDashboard />
                </ProtectedRoute>
              }
            >
              <Route path="store-setup" element={<StoreSetup />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
            </Route>
          </Routes>
        </div>
      </DashboardProvider>
    </UserProvider>
  );
}

export default App;

/*
Buyers who can register, Login, Browse products by all sellers, Add products to cart, Checkout, View order history, View order status, Cancel order, View seller profile, View seller products
*/
