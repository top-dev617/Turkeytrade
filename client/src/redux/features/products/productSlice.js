import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saveProducts: [],
  editProduct: null,
  saveProductInfo: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSaveProducts: (state, action) => {
      state.saveProducts = action.payload;
    },
    setEditProduct: (state, action) => {
      state.editProduct = action.payload;
    },
    setSaveProductInfo: (state, action) => {
      state.saveProductInfo = action.payload;
    },
  },
});

export const { setSaveProducts, setEditProduct, setSaveProductInfo } =
  productSlice.actions;

export default productSlice.reducer;
