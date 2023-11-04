import { base_url } from "@/utils/auth/global";
import React from "react";

const ProductDescription = ({ product }) => {
  return (
    <div className="product_description p-2">
      <div className="product_inner mt-0 p-4 !md:p-10">
        <h4>Product Description </h4>
        {product?.video && (
          <div>
            <h6>Product Video:</h6>
            <video
              controls
              loop
              autoPlay
              muted
              className="object-contain max-h-[350px]"
            >
              <source
                src={`${base_url}/uploads/${product?.video}`}
                type="video/mp4"
              />
            </video>
          </div>
        )}

        <br />
        <div>
          <h6>Product Overview:</h6>
          <div
            className="overflow-hidden"
            dangerouslySetInnerHTML={{ __html: product?.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
