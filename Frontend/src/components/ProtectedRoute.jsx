import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { accessToken, userType } = useContext(UserContext);

  if (!accessToken) return <Navigate to="/" />;

  if (requiredRole && userType !== requiredRole) {
    // If the user does not have the required role, redirect to a forbidden page or home
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
