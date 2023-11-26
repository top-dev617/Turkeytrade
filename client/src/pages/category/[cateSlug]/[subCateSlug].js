import Item from "@/components/Item";
import { useGetProductsBySubCateQuery } from "@/redux/features/products/productApi";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";

const SubCategoryProducts = () => {
  const router = useRouter();
  const { cateSlug, subCateSlug } = router.query;
  const { data, refetch, isLoading } = useGetProductsBySubCateQuery({
    cateSlug,
    subCateSlug,
  });
  useEffect(() => {
    refetch();
  }, [cateSlug, subCateSlug]);

  return (
    <div className="container">
      <h3 className="text-center my-5">
        {" "}
        {data?.data?.length > 0 &&
          `${data?.data[0].category?.cate_name} / ${data?.data[0].sub_category?.sub_cate_name}`}
      </h3>
      <Item items={data?.data} isLoading={isLoading} />
    </div>
  );
};

export default SubCategoryProducts;
