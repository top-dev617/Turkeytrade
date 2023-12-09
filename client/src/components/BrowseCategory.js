import React, { useEffect, useState } from "react";
import arrow from "../../public/assets/arrow.png";
import Link from "next/link";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";

const BrowseCategory = ({ categories }) => {
  const [showCategory, setShowCategory] = useState(null);
  const [placement, setPlacement] = useState("right");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setPlacement("right");
      } else {
        setPlacement("bottom");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(showCategory);
  return (
    <div className="browse mx-auto">
      <h5>Browse Categories</h5>
      <div className="grid grid-cols-1 gap-1">
        {categories?.map((category, index) => (
          <Popover
            open={showCategory?._id === category?._id}
            handler={() => setShowCategory(null)}
            placement={placement}
          >
            <PopoverHandler
              onMouseEnter={() => setShowCategory(category)}
              onMouseLeave={() => setShowCategory(null)}
            >
              <Link
                href={`/category/${category?.cate_slug}`}
                className="!w-full outline-none"
              >
                <Button
                  className="outline-none flex items-center justify-between bg-white shadow-none hover:!bg-gray-100 rounded duration-150 gap-5 h-10 w-full px-1 hover:text-gray-800 normal-case"
                  key={index}
                >
                  <p
                    className="break-all md:break-normal category_title"
                    dangerouslySetInnerHTML={{ __html: category?.cate_name }}
                  />
                  <img src={arrow.src} alt="" />
                </Button>
              </Link>
            </PopoverHandler>
            <PopoverContent
              onMouseEnter={() => setShowCategory(category)}
              onMouseLeave={() => setShowCategory(null)}
              className={`p-0 shadow-none border-none rounded ${
                showCategory?.subcategories?.length ? "block" : "hidden"
              }`}
            >
              {showCategory?.subcategories?.length && (
                <div className="w-full h-full min-w-[250px] md:min-w-[500px] max-w-[500px] min-h-[400px] p-2">
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
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  );
};

export default BrowseCategory;
