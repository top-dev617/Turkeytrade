import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeInfo: null,
  publicTab: 0,
};

const storeSlice = createSlice({
  name: "store slice",
  initialState,
  reducers: {
    setStoreInfo: (state, action) => {
      state.storeInfo = action.payload;
    },
    setPublicTab: (state, action) => {
      state.publicTab = action.payload;
    },
  },
});

export const { setStoreInfo, setPublicTab } = storeSlice.actions;

export default storeSlice.reducer;
