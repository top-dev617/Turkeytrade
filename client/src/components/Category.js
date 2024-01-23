import React from "react";
import BrowseCategory from "./BrowseCategory";
import CategorySlider from "./CategorySlider";
import { useGetHomeCategoriesQuery } from "@/redux/features/products/productApi";

const Category = () => {
  const { data, isLoading } = useGetHomeCategoriesQuery();
  return (
    <div className="category ">
      <div className="container !mx-auto">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 lg:col-span-4">
            <BrowseCategory
              isLoading={isLoading}
              categories={isLoading ? [] : data?.data}
            />
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
