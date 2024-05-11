import { useGetPopularProductsQuery } from "@/redux/features/products/productApi";
import React from "react";
import Item from "../Item";

const PopularProducts = () => {
  const { data, isLoading } = useGetPopularProductsQuery();

  return (
    <div className="mt-8">
      <h1 className="label mb-3">Popular Products</h1>
      <Item items={data?.data} isLoading={isLoading} />
    </div>
  );
};

export default PopularProducts;
