import React from "react";

const LoadingBtn = ({ className }) => {
  return (
    <button className={`buttonload w-fit ${className && className}`}>
      <i className="fa fa-spinner fa-spin"></i>Loading
    </button>
  );
};

export default LoadingBtn;
