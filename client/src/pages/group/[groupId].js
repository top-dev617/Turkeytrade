import Item from "@/components/Item";
import AuthRoute from "@/privete-routes/AuthRoute";
import { useGetProductsByGroupIdQuery } from "@/redux/features/products/productApi";
import { base_url } from "@/utils/auth/global";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const GroupByProducts = () => {
  const { query } = useRouter();
  const { data, refetch, isLoading } = useGetProductsByGroupIdQuery(
    query?.groupId
  );

  useEffect(() => {
    if (!data?.data) {
      refetch();
    }
  }, [query?.groupId]);
  return (
    <AuthRoute>
      <div className="container">
        <h3 className="text-center mt-5">
          {" "}
          {/* {products?.length > products.category?.cate_name} */}
        </h3>
        <Item items={data?.data} isLoading={isLoading} />
      </div>
    </AuthRoute>
  );
};

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { groupId } = params;

//   const response = await fetch(`${base_url}/products/group/${groupId}`);
//   const data = await response.json();
//   return {
//     props: {
//       products: data.data,
//     },
//   };
// }

export default GroupByProducts;
