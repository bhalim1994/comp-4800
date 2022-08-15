import React, { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { setDefaultHeader } from "../services/api/AxiosInstance";

const TOKEN_KEY = "token_bcit_bsn";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let t = localStorage.getItem(TOKEN_KEY);
    if (t) {
      setUserState(jwtDecode(t));
      setDefaultHeader(t);
    }

    setLoading(false);
  }, []);

  const setUser = (t) => {
    if (!t) return;

    try {
      localStorage.setItem(TOKEN_KEY, t);
      setDefaultHeader(t);
      setUserState(jwtDecode(t));
    } catch {
      // no user
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.reload();
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};
