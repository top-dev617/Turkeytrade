import Banner from "@/components/SellerRegister/Banner";
import RegisterForm from "@/components/SellerRegister/RegisterForm";
import Loading from "@/components/commons/Loading";
import useAuth from "@/lib/useAuth";
import { useGetStoreInfoBySellerIdQuery } from "@/redux/features/stores/storeApi";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";

const SellerRegister = () => {
  const { user, isLoading } = useAuth({
    redirectTo: "/signin",
  });
  const { data } = useGetStoreInfoBySellerIdQuery(user?._id);
  const router = useRouter();

  useEffect(() => {
    if (data && data?.data) {
      router.back();
    }
  }, [data?.data]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Banner />
          <RegisterForm user={user} store={data?.data} />
        </div>
      )}
    </>
  );
};

export default SellerRegister;
