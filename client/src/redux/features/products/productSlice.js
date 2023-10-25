import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saveProducts: [],
  editProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSaveProducts: (state, action) => {
      state.saveProducts = action.payload
    },
    setEditProduct: (state, action) => {
      state.editProduct = action.payload
    }
  },
});

export const {
  setSaveProducts,
  setEditProduct
} = productSlice.actions;

export default productSlice.reducer;
