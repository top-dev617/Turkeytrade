import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import storeReducer from "./features/stores/storeSlice";

const store = configureStore({
  reducer: {
    store: storeReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
