import { base_url } from "@/lib/global";
import { useState, useEffect } from "react";
import { token_name } from "./constants";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      fetch(`${base_url}/users/user-info/me`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem(token_name)}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.message === "Forbidden Access") {
            setIsLoading(false);
          } else {
            setUser(data);
            setIsLoading(false);
          }
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const logout = () => {
    setIsLoading(true);
    localStorage.removeItem(token_name);
    setUser(null);
    setIsLoading(false);
  };

  const refetch = async () => {
    setIsLoading(true);
    await fetchData();
  };

  return { user, isLoading, refetch, setUser, logout };
};

export default useAuth;
