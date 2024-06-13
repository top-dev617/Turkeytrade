import Item from "@/components/Item";
import { useGetProductsBySubCateQuery } from "@/redux/features/products/productApi";
import Pagination from "@/utils/Pagination";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";

const SubCategoryProducts = () => {
  const router = useRouter();
  const { cateSlug, subCateSlug } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch, isLoading } = useGetProductsBySubCateQuery({
    cateSlug,
    subCateSlug,
    page: currentPage,
  });

  const totalPages = data?.meta?.totalPages || 0;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    refetch();
  }, [cateSlug, subCateSlug]);

  return (
    <div className="container min-h-screen">
      <h3 className="text-center my-5">
        {" "}
        {data?.data?.length > 0 &&
          `${data?.data[0].category?.cate_name} / ${data?.data[0].sub_category?.sub_cate_name}`}
      </h3>
      <Item items={data?.data} isLoading={isLoading} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SubCategoryProducts;
