import { useGetStoreCategoriesQuery } from "@/redux/features/stores/storeApi";
import Link from "next/link";
import arrow from "../../../public/assets/arrow.png";
import React from "react";
import Loading from "../commons/Loading";
import { useGetUniqueProductGroupByStoreIdQuery } from "@/redux/features/product-group/productGroupApi";

const StoreCategories = ({ store }) => {
  const { data, isLoading } = useGetUniqueProductGroupByStoreIdQuery(
    store?._id
  );
  return (
    <div className="md:px-8 pb-8">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h5 className="text-xl font-bold mb-2">Browse Categories</h5>

          <div className="grid md:grid-cols-3 gap-2 md:gap-4 mx-auto">
            {data?.data?.map((group, index) => (
              <Link
                href={`/group/${group?._id}`}
                className="flex items-center justify-between bg-gray-200 shadow-none hover:bg-gray-300 rounded-sm duration-150 gap-5 h-10 w-full px-1 hover:text-gray-800 normal-case"
                key={index}
              >
                <div className="flex items-center gap-5">
                  <p dangerouslySetInnerHTML={{ __html: group?.title }} />
                </div>
                <img src={arrow.src} alt="" />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StoreCategories;
