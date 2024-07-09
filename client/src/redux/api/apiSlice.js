import { TURKEY_TOKEN_NAME, base_url } from "@/utils/auth/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
    prepareHeaders: (headers) => {
      const token = `Bearer ${Cookies.get(TURKEY_TOKEN_NAME)}`;
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
    "save-products",
  ],
  endpoints: () => ({}),
});
