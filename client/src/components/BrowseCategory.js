import React, { useEffect, useState } from "react";
import arrow from "../../public/assets/arrow.png";
import Link from "next/link";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { setCatesShow } from "@/redux/features/helpers/helperSlice";
import CateSidebarLoader from "./CateSidebarLoader";

const BrowseCategory = ({ isLoading, categories }) => {
  const [showCategory, setShowCategory] = useState(null);
  const dispatch = useDispatch();

  const mEnter = (cate) => {
    setShowCategory(cate);
    dispatch(setCatesShow(true));
  };
  const mLeave = () => {
    setShowCategory(null);
    dispatch(setCatesShow(false));
  };

  // console.log(showCategory);
  return (
    <div
      onMouseLeave={() => mLeave()}
      className="browse mx-auto scale-100 z-50"
    >
      <h5>Browse Categories</h5>
      {isLoading ? (
        <CateSidebarLoader />
      ) : (
        <div className="grid grid-cols-1 gap-1 max-h-[585px] overflow-y-auto relative">
          {categories?.map((category, index) => (
            <div className="relative">
              <Link
                href={`/category/${category?.cate_slug}`}
                className="!w-full outline-none"
              >
                <Button
                  onMouseEnter={() => mEnter(category)}
                  className="outline-none flex items-center justify-between bg-white shadow-none hover:!bg-gray-200 rounded-sm duration-150 gap-5 h-10 w-full px-1 hover:text-gray-800 normal-case"
                  key={index}
                >
                  <p
                    className="break-all md:break-normal category_title"
                    dangerouslySetInnerHTML={{ __html: category?.cate_name }}
                  />
                  <img src={arrow.src} alt="" />
                </Button>
              </Link>
            </div>
          ))}
          {showCategory && showCategory?.subcategories?.length && (
            <div
              onMouseEnter={() => mEnter(showCategory)}
              style={{ zIndex: 1000, position: "fixed" }}
              className="fixed top-20 right-0 lg:-right-[300px] !z-[9999999] bg-white border h-full max-h-[585px] shadow-sm shadow-pmd rounded-md"
            >
              {showCategory?.subcategories?.length && (
                <div className="h-full w-[300px] overflow-y-auto p-2">
                  {showCategory?.subcategories?.map((subCate, i) => (
                    <Link
                      href={`/category/${showCategory?.cate_slug}/${subCate?.sub_cate_slug}`}
                      className="!w-full outline-none"
                    >
                      <Button
                        className="outline-none flex items-center justify-between bg-white shadow-none hover:!bg-gray-100 rounded duration-150 gap-5 h-10 w-full px-1 hover:text-gray-800 normal-case"
                        key={i}
                      >
                        <p
                          className="break-all md:break-normal category_title"
                          dangerouslySetInnerHTML={{
                            __html: subCate?.sub_cate_name,
                          }}
                        />
                        <img src={arrow.src} alt="" />
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BrowseCategory;

/*

<div className="browse mx-auto scale-100 z-50">
      <h5>Browse Categories</h5>
      {isLoading ? (
        <CateSidebarLoader />
      ) : (
        <div
          onMouseLeave={() => dispatch(setCatesShow(false))}
          className="grid grid-cols-1 gap-1 max-h-[585px] overflow-y-auto relative"
        >
          {categories?.map((category, index) => (
            <div className="relative">
              <Link
                href={`/category/${category?.cate_slug}`}
                className="!w-full outline-none"
              >
                <Button
                  onMouseEnter={() => mEnter(category)}
                  onMouseLeave={() => mLeave()}
                  className="outline-none flex items-center justify-between bg-white shadow-none hover:!bg-gray-200 rounded-sm duration-150 gap-5 h-10 w-full px-1 hover:text-gray-800 normal-case"
                  key={index}
                >
                  <p
                    className="break-all md:break-normal category_title"
                    dangerouslySetInnerHTML={{ __html: category?.cate_name }}
                  />
                  <img src={arrow.src} alt="" />
                </Button>
              </Link>
              {category?._id === showCategory?._id && (
                <div
                  onMouseEnter={() => mEnter(category)}
                  onMouseLeave={() => mLeave()}
                  style={{ zIndex: 1000, position: "fixed" }}
                  className="fixed top-20 right-0 lg:-right-[290px] !z-[9999999] bg-white border h-full max-h-[585px] shadow-sm shadow-pmd rounded-md"
                >
                  {showCategory?.subcategories?.length && (
                    <div className="h-full w-[300px] overflow-y-auto p-2">
                      {showCategory?.subcategories?.map((subCate, i) => (
                        <Link
                          href={`/category/${category?.cate_slug}/${subCate?.sub_cate_slug}`}
                          className="!w-full outline-none"
                        >
                          <Button
                            className="outline-none flex items-center justify-between bg-white shadow-none hover:!bg-gray-100 rounded duration-150 gap-5 h-10 w-full px-1 hover:text-gray-800 normal-case"
                            key={i}
                          >
                            <p
                              className="break-all md:break-normal category_title"
                              dangerouslySetInnerHTML={{
                                __html: subCate?.sub_cate_name,
                              }}
                            />
                            <img src={arrow.src} alt="" />
                          </Button>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>

*/
