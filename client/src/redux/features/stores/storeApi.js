import { api } from "../../api/apiSlice";

const storeApi = api.injectEndpoints({
    endpoints: (builder) => ({
        postStoreRequest: builder.mutation({
            query: ({ data }) => ({
                url: `/stores/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["store"],
        }),
        patchStoreInfoById: builder.mutation({
            query: ({ data, id }) => ({
                url: `/stores/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["store"],
        }),


        // get product by id
        getStoreInfoBySellerId: builder.query({
            query: (id) => `/stores/user/${id}`,
            providesTags: ["store"],
        }),
        // get product by id
        getStoreInfo: builder.query({
            query: (id) => `/stores/${id}`,
            providesTags: ["store"],
        }),

        // get categories by store used
        getStoreCategories: builder.query({
            query: (id) => `/stores/store/${id}/categories`,
            providesTags: ["products"],
        }),


    }),
});

export const {
    usePostStoreRequestMutation,
    useGetStoreInfoBySellerIdQuery,
    usePatchStoreInfoByIdMutation,
    useGetStoreInfoQuery,

    useGetStoreCategoriesQuery
} = storeApi;
