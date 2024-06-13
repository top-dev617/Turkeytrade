import Item from "@/components/Item";
import { useGetSearchProductsQuery } from "@/redux/features/products/productApi";
import Pagination from "@/utils/Pagination";
import { base_url } from "@/utils/auth/global";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Search = () => {
  const router = useRouter();
  const { search } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch, isLoading } = useGetSearchProductsQuery({
    search: search,
    page: currentPage,
  });

  const totalPages = data?.meta?.totalPages || 0;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    refetch();
  }, [search]);

  return (
    <div className="container mx-auto !my-8 min-h-screen">
      <Item items={data?.data} isLoading={isLoading} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { search } = params;

  const response = await fetch(
    `${base_url}/products/search/products?search=${search}`
  );
  const data = await response.json();
  return {
    props: {
      products: data.data,
    },
  };
}

export default Search;
