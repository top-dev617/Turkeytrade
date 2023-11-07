import Item from "@/components/Item";
import AuthRoute from "@/privete-routes/AuthRoute";
import { base_url } from "@/utils/auth/global";
import React, { useEffect } from "react";

const Category = ({ products }) => {
  return (
    <AuthRoute>
      <div className="container">
        <h3 className="text-center mt-5">
          {" "}
          {/* {products?.length > products.category?.cate_name} */}
        </h3>
        <Item items={products} />
      </div>
    </AuthRoute>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { groupId } = params;

  const response = await fetch(`${base_url}/products/group/${groupId}`);
  const data = await response.json();
  return {
    props: {
      products: data.data,
    },
  };
}

export default Category;
