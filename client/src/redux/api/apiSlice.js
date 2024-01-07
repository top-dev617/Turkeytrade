import { base_url } from "@/utils/auth/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
    prepareHeaders: (headers) => {
      const token = `Bearer ${localStorage.getItem("turkey-trade-market")}`;
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: [
    "category",
    "products",
    "store",
    "users",
    "chats",
    "messages",
    "seen_messages",
    "product-groups",
  ],
  endpoints: () => ({}),
});
