import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    publicTab: 0,
};

const storeSlice = createSlice({
    name: "store slice",
    initialState,
    reducers: {
        setPublicTab: (state, action) => {
            state.publicTab = action.payload
        }
    },
});

export const {
    setPublicTab
} = storeSlice.actions;

export default storeSlice.reducer;
