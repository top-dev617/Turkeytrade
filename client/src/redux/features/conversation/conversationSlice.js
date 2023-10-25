import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatId: "",
  receiverData: null,
  chatData: [],
  openHelpCenter: false,
};

const conversationSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
    setReceiverData: (state, action) => {
      state.receiverData = action.payload;
    },
    setChatData: (state, action) => {
      state.chatData = action.payload;
    },
    setOpenHelpCenter: (state, action) => {
      state.openHelpCenter = action.payload;
    },
    handelClosePopup: (state, action) => {
      state.chatId = "";
      state.openHelpCenter = false;
      state.receiverData = null;
    },
  },
});

export const {
  setChatId,
  setReceiverData,
  setChatData,
  setOpenHelpCenter,
  handelClosePopup,
} = conversationSlice.actions;

export default conversationSlice.reducer;
