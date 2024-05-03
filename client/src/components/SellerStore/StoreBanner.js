import React from "react";

const StoreBanner = ({ store }) => {
  // console.log(store)
  return (
    <div className="store_banner !bg-[#EFF4ED]">
      <div className="container">
        <h4 className="font-inter">{store?.store_name}</h4>
      </div>
    </div>
  );
};

export default StoreBanner;
