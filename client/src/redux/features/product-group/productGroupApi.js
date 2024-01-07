import { api } from "../../api/apiSlice";

const productGroupApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // add chat
    postProductGroup: builder.mutation({
      query: ({ data }) => ({
        url: `/product-groups/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product-groups"],
    }),

    getProductGroupByStoreId: builder.query({
      query: (storeId) => `/product-groups/store/${storeId}`,
      providesTags: ["product-groups"],
    }),
    isExistGroup: builder.query({
      query: (id) => `/product-groups/isexist/${id}`,
      providesTags: ["product-groups"],
    }),
    getUniqueProductGroupByStoreId: builder.query({
      query: (storeId) => `/product-groups/unique/store/${storeId}`,
      providesTags: ["product-groups"],
    }),

    removeGroupById: builder.mutation({
      query: ({ id }) => ({
        url: `/product-groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product-groups", "products"],
    }),
  }),
});

export const {
  usePostProductGroupMutation,
  useGetProductGroupByStoreIdQuery,
  useGetUniqueProductGroupByStoreIdQuery,

  // check is exist group
  useIsExistGroupQuery,
  useRemoveGroupByIdMutation,
} = productGroupApi;
