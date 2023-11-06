import { base_url } from "@/utils/auth/global";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [sellerStatus, setSellerStatus] = useState(true);
  const [msgOpen, setMsgOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedIn = () => {
    const isLog = localStorage.getItem("isSignedIn", true);
    return isLog;
  };
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

  const sellerStatusAdd = () => {
    setSellerStatus(false);
    localStorage.setItem("sellerStatus", false);
  };

  const uploadImg = async (files) => {
    let images = [];
    for (const file of files) {
      if (file instanceof File && file.type.startsWith("image/")) {
        const formData = new FormData();
        formData.append("image", file);
        const response = await fetch(
          "https://api.imgbb.com/1/upload?key=932ae96b4af949bccda61ebea8105393",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        images.push(data?.data?.url);
      } else {
        images.push(file);
      }
    }
    return images;
  };

  const contextValue = {
    isSignedIn,
    setIsSignedIn,
    signOut,
    isLoggedIn,
    sellerStatus,
    sellerStatusAdd,
    user,
    setUser,
    isLoading,
    setIsLoading,
    uploadImg,
    msgOpen,
    setMsgOpen,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
