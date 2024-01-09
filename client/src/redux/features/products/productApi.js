import { api } from "../../api/apiSlice";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // products categories
    getCategories: builder.query({
      query: () => `/categories/show/cate`,
      providesTags: ["category"],
    }),

    // add product
    postProduct: builder.mutation({
      query: ({ data }) => ({
        url: `/products/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products", "product-groups"],
    }),

    // update product
    patchProduct: builder.mutation({
      query: ({ data, id }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["products", "product-groups"],
    }),

    // get all products
    getProducts: builder.query({
      query: () => `/products/show/product`,
      providesTags: ["products"],
    }),

    // get all products
    getLatestProducts: builder.query({
      query: () => `/products/latest/products`,
      providesTags: ["products"],
    }),

    // get all products by category
    getProductsByCate: builder.query({
      query: (cateSlug) => `/products/category/${cateSlug}`,
      providesTags: ["products"],
    }),
    getProductsBySubCate: builder.query({
      query: ({ cateSlug, subCateSlug }) =>
        `/products/category/${cateSlug}/${subCateSlug}`,
      providesTags: ["products"],
    }),

    // get all products by store
    getProductsByStore: builder.query({
      query: ({ storeId, page }) => `/products/store/${storeId}?page=${page}`,
      providesTags: ["products"],
    }),

    // get all products by store
    getProductsByGroupId: builder.query({
      query: (groupId) => `/products/group/${groupId}`,
      providesTags: ["product-groups"],
    }),

    // get all products by store
    getDraftProductsByStore: builder.query({
      query: (storeId, page) => `/products/store/${storeId}/draft?page=${page}`,
      providesTags: ["products"],
    }),

    // get product by id
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["products"],
    }),

    deleteProduct: builder.mutation({
      query: ({ ids }) => ({
        url: `/products/delete/many/ids`,
        method: "DELETE",
        body: ids,
        headers: {
          authorization: `Bearer ${localStorage.getItem(
            "turkey-trade-market"
          )}`,
        },
      }),
      invalidatesTags: ["products", "product-groups"],
    }),

    // draf product sections
    // add product
    postDraftProduct: builder.mutation({
      query: ({ data }) => ({
        url: `/draft-products/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["draft-products"],
    }),

    // update product
    patchDraftProduct: builder.mutation({
      query: ({ data, id }) => ({
        url: `/draft-products/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["draft-products"],
    }),

    // create save product
    createSaveProduct: builder.mutation({
      query: ({ data }) => ({
        url: `/save-products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["save-products"],
    }),

    // get save products by userId
    getSaveProductsByUserId: builder.query({
      query: () => `/save-products`,
      providesTags: ["save-products"],
    }),
    // get save products by userId
    getSingleSaveProductById: builder.query({
      query: (id) => `/save-products/single/${id}`,
    }),

    // delete save product
    removeSaveProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/save-products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["save-products"],
    }),
  }),
});

export const {
  // categories
  useGetCategoriesQuery,

  // products
  usePostProductMutation,
  usePatchProductMutation,
  useGetProductsQuery,
  useGetLatestProductsQuery,
  useGetProductsByCateQuery,
  useGetProductsBySubCateQuery,
  useGetProductsByStoreQuery,
  useGetProductByIdQuery,

  useDeleteProductMutation,

  // draf products sections
  usePostDraftProductMutation,
  useGetDraftProductsByStoreQuery,
  usePatchDraftProductMutation,

  // save product part
  useCreateSaveProductMutation,
  useGetSaveProductsByUserIdQuery,
  useGetSingleSaveProductByIdQuery,
  useRemoveSaveProductMutation,
} = productApi;
