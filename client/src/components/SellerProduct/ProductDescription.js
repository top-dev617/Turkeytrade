import { base_url } from "@/utils/auth/global";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import VideoPlayer from "../commons/video-player/VideoPlayer";
import Link from "next/link";
import RecentlyViewedProducts from "./RecentlyViewedProducts";

const ProductDescription = ({ product, relatedProducts = [], currentId }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row md:justify-between items-start gap-1 w-full">
      <div className="product_description !pb-[20px] md:pb-[70px] md:p-2 w-full flex-grow">
        <div className="product_inner mt-0 p-2 md:!p-10 min-h-[550px]">
          <h4>Product Description </h4>
          {product?.video && (
            <div>
              <h6>Product Video:</h6>

              <VideoPlayer
                url={`${base_url}/uploads/${product?.video}`}
                className="object-contain h-fit max-w-[400px]"
              />
            </div>
          )}

          <br />
          <div>
            <h6>Product Overview:</h6>
            <div
              className="overflow-hidden all_break"
              dangerouslySetInnerHTML={{ __html: product?.description }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row lg:flex-col gap-y-2 gap-x-4">
        {relatedProducts?.length > 0 && (
          <div className="min-w-[300px] max-w-[300px] bg-white !shadow rounded-md pt-2 px-3 md:m-2 h-fit pb-4">
            <h1 className="text-black font-bold font-inter  mt-2">
              Related Products
            </h1>

            {relatedProducts.map((product, index) => (
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
                          <h1 className="font-semibold !text-red-600 text-base">
                            € {product.minPrice} - {product.maxPrice}
                          </h1>
                        ) : (
                          <>
                            {parseInt(product?.price?.one_price?.from) ===
                            parseInt(product?.price?.one_price?.to) ? (
                              <h1 className="label-list ">
                                <span className="text-base !font-bold">
                                  {product?.price?.one_price?.from}
                                </span>{" "}
                                <span className="!text-xs">
                                  euro/
                                  {product?.unit?.singular.toLowerCase()}
                                </span>
                              </h1>
                            ) : (
                              <h1 className="label-list !text-red-600">
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
        <RecentlyViewedProducts currentId={currentId} />
      </div>
    </div>
  );
};

export default ProductDescription;
