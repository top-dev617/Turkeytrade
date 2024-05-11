import ProductBanner from "@/components/SellerProduct/ProductBanner";
import ProductDescription from "@/components/SellerProduct/ProductDescription";
import Loading from "@/components/commons/Loading";
import { useGetProductByIdQuery } from "@/redux/features/products/productApi";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Details = () => {
  const { query } = useRouter();
  const { data, isLoading, refetch } = useGetProductByIdQuery(query?.id);
  // console.log(data, isLoading);
  useEffect(() => {
    refetch();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [query?.id]);

  useEffect(() => {
    const handlePopstate = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  const handleViewProduct = () => {
    const products = localStorage.getItem("view-prods")
      ? JSON.parse(localStorage.getItem("view-prods"))
      : [];

    const itemIndex = products.findIndex((item) => item === data?.data?._id);
    if (itemIndex === -1) {
      products.unshift(data?.data?._id);
      const maxViewedProducts = 10;
      const updatedProducts = products.slice(0, maxViewedProducts);
      localStorage.setItem("view-prods", JSON.stringify(updatedProducts));
      console.log("Updated viewed products:", updatedProducts);
    }
  };

  useEffect(() => {
    if (data?.data?._id) {
      handleViewProduct();
    }
  }, [data?.data?._id]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mb-12">
          <ProductBanner product={data?.data || null} />
          <ProductDescription
            product={data?.data || null}
            relatedProducts={data?.related_products}
            currentId={query?.id}
          />
        </div>
      )}
    </>
  );
};

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { id } = params;

//   const response = await fetch(`${base_url}/products/${id}`);
//   const data = await response.json();
//   return {
//     props: {
//       product: data.data,
//     },
//   };
// }

export default Details;
