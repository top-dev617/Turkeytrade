import { base_url } from "@/lib/global";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const url = `${base_url}/users/user-info/me`;

  useEffect(() => {
    setIsLoading(true);
    fetch(url, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("turkey-trade-market")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      });
  }, []);

  const signOut = () => {
    localStorage.removeItem("turkey-trade-market");
    setUser(null);
  };

  const contextValue = {
    signOut,
    user,
    setUser,
    isLoading,
    setIsLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
