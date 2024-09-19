import { createContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [serverMessage, setServerMessage] = useState("");
  const navigate = useNavigate();

  const effectRan = useRef(false);

  const { apiRequest, loading, error } = useApi();

  const register = async (email, password, userType) => {
    try {
      const data = await apiRequest("http://localhost:5000/register", "POST", {
        email,
        password,
        userType,
      });

      setServerMessage(`${data.message}`);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  };

  const login = async (email, password) => {
    try {
      const data = await apiRequest("http://localhost:5000/login", "POST", {
        email,
        password,
      });

      setUser(data.email);
      setUserType(data.userType);
      setAccessToken(data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      setServerMessage(`Logging in with: ${data.email}`);
      //TODO: redirect to content page after 1 second
      setTimeout(() => navigate("/store"), 1000);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  };

  const logout = async () => {
    try {
      const data = await apiRequest("http://localhost:5000/logout", "POST");

      localStorage.removeItem("refreshToken");
      setUser(null);
      setAccessToken(null);
      setServerMessage(`${data.message}`);

      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  };

  // get a new access token if a refresh token exists
  useEffect(() => {
    if (effectRan.current) return; // Prevent multiple calls

    async function checkRefreshToken() {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) return;

        const data = await apiRequest("http://localhost:5000/refresh", "POST", {
          refreshToken,
        });

        setAccessToken(data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    }
    checkRefreshToken();
    effectRan.current = true;
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userType,
        accessToken,
        setAccessToken,
        register,
        login,
        logout,
        serverMessage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
