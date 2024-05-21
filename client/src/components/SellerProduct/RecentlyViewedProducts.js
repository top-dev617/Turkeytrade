import { useRecentViewProductsMutation } from "@/redux/features/products/productApi";
import { base_url } from "@/utils/auth/global";
import Link from "next/link";
import React, { useMemo, useState } from "react";

const RecentlyViewedProducts = ({ currentId }) => {
  const [recentViewProducts] = useRecentViewProductsMutation();
  const [products, setProducts] = useState([]);

  const handleFetch = async () => {
    const ids = localStorage.getItem("view-prods")
      ? JSON.parse(localStorage.getItem("view-prods"))
      : [];

    if (currentId && ids.length > 0) {
      const options = {
        currentProId: currentId,
        data: { ids: ids },
      };

      const result = await recentViewProducts(options);
      if (result?.data?.success) {
        setProducts(result?.data?.data);
      }
    }
  };

  useMemo(() => {
    if (currentId) {
      handleFetch();
    }
  }, [currentId]);

  return (
    <div>
      {products?.length > 0 && (
        <div className="min-w-[300px] max-w-[300px] bg-white !shadow rounded-md pt-2 px-3 md:m-2 h-fit pb-4">
          <h1 className="text-black font-bold font-inter  mt-2">
            Recently Viewed
          </h1>

          {products.map((product, index) => (
            <>
              <hr className="mb-3 mt-2 border-gray-500" />
              <div
                key={index}
                className="flex  !items-start gap-2 h-fit cursor-pointer mb-3"
              >
                <div className="bg-gray-50 flex items-start justify-start w-[100px] overflow-hidden max-h-[90px] relative">
                  <img
                    className="w-full h-full object-contain"
                    src={
                      product?.images?.length &&
                      `${base_url}/uploads/${product?.images[0]}`
                    }
                    loading="lazy"
                    alt=""
                  />
                </div>
                <div className="flex-grow w-full">
                  <Link href={`/product/${product?._id}`}>
                    <h1 className="text-black font-semibold mb-2 text-sm pt-0 mt-0 font-inter twoLine all_break hover:!text-pm">
                      {product?.title}
                    </h1>
                  </Link>
                  <>
                    <div className="flex items-center flex-wrap gap-1">
                      {product?.price?.price_type === "ladder_price" ? (
                        <h1 className="font-semibold !text-[#00008B] text-base">
                          € {product.price?.minPrice} -{" "}
                          {product.price?.maxPrice}
                        </h1>
                      ) : (
                        <>
                          {parseInt(product?.price?.one_price?.from) ===
                          parseInt(product?.price?.one_price?.to) ? (
                            <h1 className="label-list ">
                              <span className="text-base !text-[#00008B] !font-bold">
                                {product?.price?.one_price?.from}
                              </span>{" "}
                              <span className="!text-xs">
                                euro/
                                {product?.unit?.singular.toLowerCase()}
                              </span>
                            </h1>
                          ) : (
                            <h1 className="label-list !text-[#00008B]">
                              <span className="text-base !font-bold">
                                {product?.price?.one_price?.from} -{" "}
                                {product?.price?.one_price?.to}
                              </span>{" "}
                              <span className="!text-xs">
                                euro/
                                {product?.unit?.singular.toLowerCase()}
                              </span>
                            </h1>
                          )}
                        </>
                      )}
                    </div>
                  </>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyViewedProducts;
