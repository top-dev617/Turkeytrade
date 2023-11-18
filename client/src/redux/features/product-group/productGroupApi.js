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
    getUniqueProductGroupByStoreId: builder.query({
      query: (storeId) => `/product-groups/unique/store/${storeId}`,
      providesTags: ["product-groups"],
    }),
  }),
});

export const {
  usePostProductGroupMutation,
  useGetProductGroupByStoreIdQuery,
  useGetUniqueProductGroupByStoreIdQuery,
} = productGroupApi;
