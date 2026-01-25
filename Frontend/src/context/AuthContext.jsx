import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("unique-token"));

  const login = () => {
    const fakeToken = "unique-token-123";
    localStorage.setItem("unique-token", fakeToken);
    setToken(fakeToken);
  };

  const logout = () => {
    localStorage.removeItem("unique-token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
