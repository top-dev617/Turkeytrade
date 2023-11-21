import Item from "@/components/Item";
import { useGetSaveProductsByUserIdQuery } from "@/redux/features/products/productApi";
import React from "react";
import { useSelector } from "react-redux";

const SaveProducts = () => {
  const { data, isLoading } = useGetSaveProductsByUserIdQuery();
  return (
    <div className="container !my-8">
      <Item items={data?.data} isLoading={isLoading} />
    </div>
  );
};

export default SaveProducts;
