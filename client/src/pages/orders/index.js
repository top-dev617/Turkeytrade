import Loading from "@/components/commons/Loading";
import OrderTable from "@/components/dashboard/orders/OrderTable";
import useAuth from "@/lib/useAuth";
import React from "react";

const OrderPage = () => {
  const {
    user,
    isLoading,
    // refetch,
    // setUser,
  } = useAuth({
    redirectTo: "/signin",
  });
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mx-auto my-8">
          <OrderTable />
        </div>
      )}
    </>
  );
};

export default OrderPage;
