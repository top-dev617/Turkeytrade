import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import rightArrow from "../../public/assets/right-arrow.png";
import leftArrow from "../../public/assets/left-arrow.png";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const getItemProps = (index) => ({
    variant: currentPage === index ? "filled" : "text",
    className: `rounded text-xl ${
      currentPage === index ? "active text-white" : "text"
    }`,
    color: "gray",
    onClick: () => onPageChange(index),
  });

  const next = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <>
      {/* <div className="flex items-center justify-center gap-4 py-4">
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={prev}
          disabled={currentPage === 1}
        >
          <img src={leftArrow.src} alt="" />
        </Button>
        <div className="flex items-center gap-2">
          {[...Array(totalPages).keys()].map((index) => (
            <IconButton key={index} {...getItemProps(index + 1)}>
              {index + 1}
            </IconButton>
          ))}
        </div>
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={next}
          disabled={currentPage === totalPages}
        >
          <img src={rightArrow.src} alt="" />
        </Button>
      </div> */}
    </>
  );
};

export default Pagination;

{
  /* <div className="container">
        <div className="pagination">
          <img src={leftArrow.src} alt="" />
          <button>01</button>
          <button className="active">02</button>
          <button>...</button>
          <button>09</button>
          <img src={rightArrow.src} alt="" />
        </div>
      </div> */
}
