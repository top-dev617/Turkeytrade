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

          <div className="grid grid-cols-1 gap-1 mx-auto">
            {data?.data?.map((group, index) => (
              <Link
                href={`/group/${group?._id}`}
                className="flex items-center justify-between hover:bg-green-100 rounded duration-150 gap-5 h-14 px-1"
                key={index}
              >
                <div className="flex items-center gap-5">
                  {/* <img
                    className="rounded"
                    src={group?.image}
                    alt=""
                    style={{ width: "50px" }}
                  /> */}
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
