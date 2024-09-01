import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [serverMessage, setServerMessage] = useState("");
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
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

      setServerMessage(`Logging in with: ${data.email}`);

      //TODO: redirect to content page after 1.5 seconds
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(`${data.error}`);
      }

      setServerMessage(`${data.message}`);

      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      setServerMessage(`Error: ${error.message}`);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        login,
        logout,
        serverMessage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
