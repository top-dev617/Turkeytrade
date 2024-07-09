import { TURKEY_TOKEN_NAME, base_url } from "@/utils/auth/global";
import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${base_url}/users/user-info/me`, {
      headers: {
        authorization: `Bearer ${
          Cookies.get(TURKEY_TOKEN_NAME) ? Cookies.get(TURKEY_TOKEN_NAME) : ""
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      });
  }, []);

  const signOut = () => {
    Cookies.remove(TURKEY_TOKEN_NAME);
    setUser(null);
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
