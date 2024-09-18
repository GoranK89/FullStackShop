import { createContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [serverMessage, setServerMessage] = useState("");
  const navigate = useNavigate();

  const effectRan = useRef(false);

  const register = async (email, password, userType) => {
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userType }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`${data.error}`);
      }

      setServerMessage(`${data.message}`);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`${data.error}`);
      }
      setUser(data.email);
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
      const response = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`${data.error}`);
      }
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

        const response = await fetch("http://localhost:5000/refresh", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken: localStorage.getItem("refreshToken"),
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch refresh token");
        }
        const result = await response.json();
        setAccessToken(result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);
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
