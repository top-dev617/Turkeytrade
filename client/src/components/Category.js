import React from "react";
import BrowseCategory from "./BrowseCategory";
import CategorySlider from "./CategorySlider";

const Category = ({ categories }) => {
  return (
    <div className="category ">
      <div className="container !mx-auto">
        <div className="row">
          <div className="col-12 col-lg-4">
            <BrowseCategory categories={categories} />
          </div>
          <div className="col-12 col-lg-8 mt-8 md:mt-0">
            <CategorySlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
