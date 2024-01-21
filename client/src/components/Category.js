import React from "react";
import BrowseCategory from "./BrowseCategory";
import CategorySlider from "./CategorySlider";

const Category = ({ categories }) => {
  return (
    <div className="category ">
      <div className="container !mx-auto">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 lg:col-span-4">
            <BrowseCategory categories={categories} />
          </div>
          <div className="col-span-12 lg:col-span-8 mt-8 md:mt-0">
            <CategorySlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
