import React from "react";


const ProductDescription = ({ product }) => {
  return (
    <div className="product_description p-2">
      <div className="product_inner mt-0 md:p-10">
        <h4>Product Description </h4>
        <div>
          <h6>Product Overview:</h6>
          <div className="overflow-hidden" dangerouslySetInnerHTML={{ __html: product?.description }} />
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
