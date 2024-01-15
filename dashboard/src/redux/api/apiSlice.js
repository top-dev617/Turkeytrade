import { token_name } from "@/lib/constants";
import { base_url } from "@/lib/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
    prepareHeaders: (headers) => {
      const token = `Bearer ${localStorage.getItem(token_name)}`;
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["stores", "products"],
  endpoints: () => ({}),
});
