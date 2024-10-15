import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { accessToken, userType } = useContext(UserContext);

  if (!accessToken) {
    console.log("No access token, redirecting to home");
    return <Navigate to="/" />;
  }

  if (requiredRole && userType !== requiredRole) {
    console.log("User does not have the required role, redirecting to home");
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
