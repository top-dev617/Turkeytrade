import React from "react";
import arrow from "../../public/assets/arrow.png";
import Link from "next/link";

const BrowseCategory = ({ categories }) => {
  return (
    <div className="browse mx-auto">
      <h5>Browse Categories</h5>
      <div className="grid grid-cols-1 gap-1">
        {categories?.map((category, index) => (
          <Link
            href={`/category/${category?._id}`}
            className="flex items-center justify-between hover:bg-gray-300/70 rounded duration-150 gap-5 h-14 px-1 hover:text-gray-800"
            key={index}
          >
            <div className="flex items-center gap-2 md:gap-5">
              <img
                className="rounded"
                src={category?.image}
                alt=""
                style={{ width: "50px" }}
              />
              <p
                className="break-all md:break-normal"
                dangerouslySetInnerHTML={{ __html: category?.cate_name }}
              />
            </div>
            <img src={arrow.src} alt="" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrowseCategory;
