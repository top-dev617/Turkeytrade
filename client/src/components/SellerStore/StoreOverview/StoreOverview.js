import Item from "@/components/Item";
import Loading from "@/components/commons/Loading";
import { useGetProductsByStoreQuery } from "@/redux/features/products/productApi";
import Pagination from "@/utils/Pagination";
import React, { useEffect } from "react";
import { useState } from "react";

const StoreOverview = ({ store }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch } = useGetProductsByStoreQuery(store?._id, currentPage);

  // Pagination state

  const totalPages = data?.pagination?.totalPages;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    if (typeof currentPage !== 'undefined') {
      const refetchWithNewPage = async () => {
        await refetch({ page: currentPage });
      };
      refetchWithNewPage();
    }
  }, [currentPage, store, refetch]);

  return (
    <div className="md:px-4">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Item items={data?.data} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};


export default StoreOverview;
