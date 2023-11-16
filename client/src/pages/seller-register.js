import Banner from "@/components/SellerRegister/Banner";
import RegisterForm from "@/components/SellerRegister/RegisterForm";
import { AuthContext } from "@/components/context/AuthContext";
import { useGetStoreInfoBySellerIdQuery } from "@/redux/features/stores/storeApi";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";

const SellerRegister = () => {
  const { user } = useContext(AuthContext);
  const { data } = useGetStoreInfoBySellerIdQuery(user?._id);
  const router = useRouter();

  useEffect(() => {
    if (data && data?.data) {
      router.back();
    }
  }, [data?.data]);
  return (
    <div>
      {user && user?._id && (
        <div>
          <Banner />
          <RegisterForm user={user} store={data?.data} />
        </div>
      )}
    </div>
  );
};

export default SellerRegister;
