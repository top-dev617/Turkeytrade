import { api } from "../../api/apiSlice";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postRegister: builder.mutation({
      query: ({ data }) => ({
        url: `/users/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    postLogin: builder.mutation({
      query: ({ data }) => ({
        url: `/users/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    socialLogin: builder.mutation({
      query: ({ data }) => ({
        url: `/users/login/social`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    postForgotPassword: builder.mutation({
      query: ({ data }) => ({
        url: `/users/forgot-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    postChangePassword: builder.mutation({
      query: ({ data }) => ({
        url: `/users/password/change-password`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "turkey-trade-market"
          )}`,
        },
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    deleteUser: builder.mutation({
      query: () => ({
        url: `/users/remove/all-data`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "turkey-trade-market"
          )}`,
        },
      }),
      invalidatesTags: ["users"],
    }),

    handleOtp: builder.mutation({
      query: ({ data }) => ({
        url: `/users/verifyEmail`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    handleResendOtp: builder.mutation({
      query: ({ data }) => ({
        url: `/users/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    checkEmail: builder.mutation({
      query: ({ data }) => ({
        url: `/users/check-email`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    checkSocialEmail: builder.mutation({
      query: ({ data }) => ({
        url: `/users/check-email/social`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    patchUserInfoById: builder.mutation({
      query: ({ data, id }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["store", "users"],
    }),

    updateUserInfoWithEmail: builder.mutation({
      query: ({ data, id }) => ({
        url: `/users/with-email/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["store", "users"],
    }),

    updateUserStoreInfo: builder.mutation({
      query: ({ data, storeId }) => ({
        url: `/users/update-user-store/${storeId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["store", "users"],
    }),

    getUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ["users"],
    }),
  }),
});

export const {
  usePostRegisterMutation,
  useSocialLoginMutation,
  usePostLoginMutation,
  usePostForgotPasswordMutation,
  usePostChangePasswordMutation,
  useDeleteUserMutation,
  useHandleOtpMutation,
  useHandleResendOtpMutation,
  useCheckEmailMutation,
  usePatchUserInfoByIdMutation,
  useCheckSocialEmailMutation,

  useUpdateUserInfoWithEmailMutation,
  useUpdateUserStoreInfoMutation,

  // get user
  useGetUserQuery,
} = authApi;
