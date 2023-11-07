import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  online_users: [],
  chatId: "",
  receiverData: null,
  chatData: [],
  openHelpCenter: false,

  // inbox for store
  inboxChatId: "",
  inboxReceiverData: null,
  inboxChatData: [],

  // store chat for any user
  storeChatId: "",
  storeReceiverData: null,
};

const conversationSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setOnline_users: (state, action) => {
      state.online_users = action.payload;
    },

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
    // logout action
    handleClearConversations: (state, action) => {
      state.chatId = "";
      state.openHelpCenter = false;
      state.receiverData = null;
      state.receiverData = null;
      state.inboxChatId = "";
      state.inboxReceiverData = null;
      state.storeChatId = "";
      state.storeReceiverData = null;
    },

    // inbox for store
    setInboxChatId: (state, action) => {
      state.inboxChatId = action.payload;
    },
    setInboxReceiverData: (state, action) => {
      state.inboxReceiverData = action.payload;
    },
    setInboxChatData: (state, action) => {
      state.inboxChatData = action.payload;
    },

    // store chat for any user
    setStoreChatId: (state, action) => {
      state.storeChatId = action.payload;
    },
    setStoreReceiverData: (state, action) => {
      state.storeReceiverData = action.payload;
    },
  },
});

export const {
  setOnline_users,
  setChatId,
  setReceiverData,
  setChatData,
  setOpenHelpCenter,
  handelClosePopup,

  // close all for logout
  handleClearConversations,

  // inbox for store
  setInboxChatId,
  setInboxReceiverData,
  setInboxChatData,

  // store chat for any user
  setStoreChatId,
  setStoreReceiverData,
} = conversationSlice.actions;

export default conversationSlice.reducer;
