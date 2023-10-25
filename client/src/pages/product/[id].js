import ProductBanner from "@/components/SellerProduct/ProductBanner";
import ProductDescription from "@/components/SellerProduct/ProductDescription";
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

  const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/products/${id}`);
  const data = await response.json();
  return {
    props: {
      product: data.data,
    },
  };
}

export default Details;
