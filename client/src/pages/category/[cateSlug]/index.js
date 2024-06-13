import Item from "@/components/Item";
import AuthRoute from "@/privete-routes/AuthRoute";
import { useGetProductsByCateQuery } from "@/redux/features/products/productApi";
import Pagination from "@/utils/Pagination";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Category = () => {
  const router = useRouter();
  const { cateSlug } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch, isLoading } = useGetProductsByCateQuery({
    slug: cateSlug,
    page: currentPage,
  });
  const totalPages = data?.meta?.totalPages || 0;

  const handlePageChange = (page) => {
    if (page !== "...") {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    refetch();
  }, [cateSlug]);

  return (
    <div className="container min-h-screen">
      <h3 className="text-center my-5">
        {" "}
        {data?.data?.length > 0 && data?.data[0].category?.cate_name}
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

export default Category;
