import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  online_users: [],
  chatId: "",
  receiverData: null,
  chatData: [],
  openHelpCenter: false,
  image: null,

  // inbox for store
  inboxChatId: "",
  inboxReceiverData: null,
  inboxChatData: [],

  // store chat for any user
  storeChatId: "",
  storeReceiverData: null,

  notifications: [],
  totalNotifications: 0,
};

const conversationSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setOnline_users: (state, action) => {
      state.online_users = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setMessagesPush: (state, action) => {
      const messages = JSON.parse(JSON.stringify(state.messages));
      const lastItems = messages.slice(-1);
      const isExist = lastItems.some(
        (msg) => msg.createdAt === action.payload.createdAt
      );
      if (!isExist) {
        state.messages.push(action.payload);
      }
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

    // notifications
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setTotalNotifications: (state, action) => {
      state.totalNotifications = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const {
  setMessages,
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

  //setNotifications
  setNotifications,
  setTotalNotifications,
  setImage,
  setMessagesPush,
} = conversationSlice.actions;

export default conversationSlice.reducer;
