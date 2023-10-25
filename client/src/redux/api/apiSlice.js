import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const server = "https://turkey-tm-server-v2.onrender.com/api/v2";
const local = "http://localhost:8000/api/v2";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: server }),
  tagTypes: ["category", "products", "store", "users", "chats", "messages"],
  endpoints: () => ({}),
});
