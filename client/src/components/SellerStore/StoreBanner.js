import React from "react";

const StoreBanner = ({ store }) => {
  // console.log(store)
  return (
    <div className="store_banner">
      <div className="container">
        <h4>{store?.store_name}</h4>
      </div>
    </div>
  );
};

export default StoreBanner;
