import { api } from "../../api/apiSlice";

const storeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: ({ data }) => ({
        url: `/helpers/send-message`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSendMessageMutation } = storeApi;
