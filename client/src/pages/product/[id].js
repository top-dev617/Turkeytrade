import ProductBanner from "@/components/SellerProduct/ProductBanner";
import ProductDescription from "@/components/SellerProduct/ProductDescription";
import { base_url } from "@/utils/auth/global";
import React from "react";

const Details = ({ product }) => {
  return (
    <div className="container mb-12">
      <ProductBanner product={product} />
      <ProductDescription product={product} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  const response = await fetch(`${base_url}/products/${id}`);
  const data = await response.json();
  return {
    props: {
      product: data.data,
    },
  };
}

export default Details;
