import Item from "@/components/Item";
import AuthRoute from "@/privete-routes/AuthRoute";
import { useGetProductsByCateQuery } from "@/redux/features/products/productApi";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Category = () => {
  const router = useRouter();
  const { cateId } = router.query;
  const { data, refetch, isLoading } = useGetProductsByCateQuery(cateId);
  useEffect(() => {
    refetch();
  }, [cateId]);
  return (
    <AuthRoute>
      <div className="container">
        <h3 className="text-center my-5">
          {" "}
          {data?.data?.length > 0 && data?.data[0].category?.cate_name}
        </h3>
        <Item items={data?.data} isLoading={isLoading} />
      </div>
    </AuthRoute>
  );
};

export default Category;
