import { base_url } from "@/utils/auth/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["category", "products", "store", "users", "chats", "messages"],
  endpoints: () => ({}),
});
