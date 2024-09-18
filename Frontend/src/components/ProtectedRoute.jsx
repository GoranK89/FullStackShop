import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { accessToken } = useContext(UserContext);

  if (!accessToken) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
