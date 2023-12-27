import React, { useEffect, useRef, useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import rightArrow from "../../public/assets/right-arrow.png";
import leftArrow from "../../public/assets/left-arrow.png";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [maxVisiblePages, setMaxVisiblePages] = useState(1);
  const containerRef = useRef();

  useEffect(() => {
    const updateMaxVisiblePages = () => {
      const containerWidth = containerRef.current.clientWidth;

      // Adjust the calculation based on your styling and margins
      const itemWidth = 40; // Adjust this value based on your styling
      const containerPadding = 8 * 2; // Assuming 8px padding on both sides

      const maxVisiblePages = Math.floor(
        (containerWidth - containerPadding) / itemWidth
      );
      setMaxVisiblePages(Math.max(maxVisiblePages, 1));
    };

    updateMaxVisiblePages();
    window.addEventListener("resize", updateMaxVisiblePages);

    return () => {
      window.removeEventListener("resize", updateMaxVisiblePages);
    };
  }, []);

  const getItemProps = (index) => ({
    variant: currentPage === index ? "filled" : "text",
    className: `rounded text-xl ${
      currentPage === index ? "active text-white" : "text"
    }`,
    color: "gray",
    onClick: () => onPageChange(index),
  });

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <IconButton key={i} {...getItemProps(i)}>
            {i}
          </IconButton>
        );
      }
    } else {
      const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

      if (start > 2) {
        pageNumbers.push(<span key="startEllipsis">...</span>);
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(
          <IconButton key={i} {...getItemProps(i)}>
            {i}
          </IconButton>
        );
      }

      if (end < totalPages - 1) {
        pageNumbers.push(<span key="endEllipsis">...</span>);
      }
    }

    return pageNumbers;
  };

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
    <div
      className="flex items-center justify-center gap-4 py-4"
      ref={containerRef}
    >
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <img src={leftArrow.src} alt="" />
      </Button>
      <div className="flex items-center gap-2">{renderPageNumbers()}</div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={currentPage === totalPages}
      >
        <img src={rightArrow.src} alt="" />
      </Button>
    </div>
  );
};

export default Pagination;
