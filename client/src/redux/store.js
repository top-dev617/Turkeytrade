import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/products/productSlice";
import { api } from "./api/apiSlice";
import conversationReducer from "./features/conversation/conversationSlice";
import storeReducer from "./features/stores/storeSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    conversation: conversationReducer,
    store: storeReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
