import { base_url } from "@/utils/auth/global";
import { useState, useEffect } from "react";

const useAuth = ({ redirectTo }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      fetch(`${base_url}/users/user-info/me`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem(
            "turkey-trade-market"
          )}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.message === "Forbidden Access") {
            if (redirectTo) {
              window.location.href = redirectTo;
            }
            setIsLoading(false);
          } else {
            setUser(data);
            setIsLoading(false);
          }
        });
    } catch (error) {
      if (redirectTo) {
        window.location.href = redirectTo;
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const logout = () => {
    setIsLoading(true);
    localStorage.removeItem("turkey-trade-market");
    setUser(null);
  };

  const refetch = async () => {
    setIsLoading(true);
    await fetchData();
  };

  return { user, isLoading, refetch, setUser, logout };
};

export default useAuth;
