import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(()=>{
    const storetoken = localStorage.getItem("unique-token")
    return storetoken ? JSON.parse(storetoken):null;
  });

  const login = () => {
    const fakeToken ={
      token: "Temprary unique token",
      
      };
    localStorage.setItem("unique-token", JSON.stringify(fakeToken));
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
