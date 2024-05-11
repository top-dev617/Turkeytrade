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

    removeGroupById: builder.mutation({
      query: ({ id }) => ({
        url: `/product-groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product-groups", "products"],
    }),

    updateGroupByIdAndStore: builder.mutation({
      query: ({ data, id, storeId }) => ({
        url: `/product-groups/${id}/${storeId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["product-groups", "products"],
    }),

    postIsExistGroup: builder.mutation({
      query: ({ id }) => ({
        url: `/product-groups/isexist/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  usePostProductGroupMutation,
  useGetProductGroupByStoreIdQuery,
  useGetUniqueProductGroupByStoreIdQuery,
  useUpdateGroupByIdAndStoreMutation,

  // check is exist group
  usePostIsExistGroupMutation,
  useRemoveGroupByIdMutation,
} = productGroupApi;
