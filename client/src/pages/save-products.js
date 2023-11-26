import Item from "@/components/Item";
import Loading from "@/components/commons/Loading";
import useAuth from "@/lib/useAuth";
import { useGetSaveProductsByUserIdQuery } from "@/redux/features/products/productApi";
import React from "react";
import { useSelector } from "react-redux";

const SaveProducts = () => {
  const { isLoading } = useAuth({
    redirectTo: "/signin",
  });
  const { data, isLoading: loading } = useGetSaveProductsByUserIdQuery();
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container !my-8">
          <Item items={data?.data} isLoading={loading} />
        </div>
      )}
    </>
  );
};

export default SaveProducts;
