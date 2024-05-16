import { base_url } from "@/utils/auth/global";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";

const SingleChatProduct = ({ product }) => {
  return (
    <div className="h-fit max-w-[700px] w-fit bg-white rounded p-1">
      <div className="flex !items-start gap-2 h-fit cursor-pointer mb-3 w-full relative">
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
            <h1 className="text-black font-semibold mb-1 text-sm pt-0 mt-0 font-inter twoLine all_break hover:!text-pm">
              {product?.title}
            </h1>
          </Link>

          <>
            <div className="flex items-center flex-wrap gap-1">
              {product?.price?.price_type === "ladder_price" ? (
                <h1 className="font-semibold !text-red-600 text-base">
                  € {product.price?.minPrice} - {product?.price?.maxPrice}
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

          <Link href={`/product/${product?._id}`}>
            <Button className="w-[70px] h-[25px] rounded shadow-none hover:shadow-none normal-case  bg-pm hover:bg-pmd !p-0 flex justify-center items-center mt-2">
              <h1 className="font-medium font-inter !text-[12px] text-white">
                View
              </h1>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleChatProduct;
