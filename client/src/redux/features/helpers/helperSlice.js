import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catesShow: false,
};

const helperSlice = createSlice({
  name: "helper slice",
  initialState,
  reducers: {
    setCatesShow: (state, action) => {
      state.catesShow = action.payload;
    },
  },
});

export const { setCatesShow } = helperSlice.actions;

export default helperSlice.reducer;
