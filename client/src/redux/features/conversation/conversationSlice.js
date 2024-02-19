import { playNtf } from "@/lib/services/globalService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  online_users: [],
  notifications: [],
  totalNotifications: 0,
  images: [],
  video: null,
  document: null,

  // global
  messages: [],
  lastMessages: [],
  chat: null,
  chats: [],
  chatData: [],

  // inbox for store
  inboxMessages: [],
  inboxChats: [],
  inboxChat: null,
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
    setMessagePush: (state, action) => {
      const chat = JSON.parse(JSON.stringify(state.chat));
      if (action.payload?.chatId === chat?._id) {
        state.messages.push(action.payload);
      }
    },
    setNtfAlert: (state, action) => {
      const stateData = JSON.parse(JSON.stringify(state));
      const isExist = stateData?.chats.find(
        (sChat) => sChat?._id === action.payload?.chatId
      );
      if (stateData?.chat?._id !== action.payload?.chatId) {
        const isMute =
          isExist?.receiver === action.payload.userId
            ? isExist?.settings?.receiver?.isMute
            : isExist?.settings?.sender?.isMute;
        if (isExist && !isMute) {
          playNtf();
        }
      }
    },
    setLastMessages: (state, action) => {
      let chats = JSON.parse(JSON.stringify(state.chats));

      const existingIndex = chats.findIndex(
        (chat) => chat._id === action.payload.chatId
      );

      if (existingIndex !== -1) {
        // Update the existing chat's lastMessage
        chats[existingIndex]["lastMessage"] = action.payload;
        const sortByIsoDateDesc = (a, b) =>
          new Date(b.lastMessage?.createdAt) -
          new Date(a.lastMessage?.createdAt);

        const sortedChats = [...chats].sort(sortByIsoDateDesc);
        state.chats = sortedChats;
      }
    },

    setChats: (state, action) => {
      const chats = action.payload;
      if (Array.isArray(chats)) {
        const sortByIsoDateDesc = (a, b) =>
          new Date(b.lastMessage?.createdAt) -
          new Date(a.lastMessage?.createdAt);
        const sortedDateArrayDesc = [...chats].sort(sortByIsoDateDesc);
        state.chats = sortedDateArrayDesc;
      } else {
        console.error("Invalid chats data:", chats);
      }
    },
    setChat: (state, action) => {
      state.chat = action.payload;
    },
    setChatSetting: (state, action) => {
      let chats = JSON.parse(JSON.stringify(state.chats));
      const stateData = JSON.parse(JSON.stringify(state));
      let chat = stateData?.chat;
      const existingIndex = stateData?.chats.findIndex(
        (chat) => chat._id === action.payload.chatId
      );
      if (chat && chat?._id === action.payload.chatId) {
        chat["settings"] = action.payload?.settings;
        state.chat = chat;
      }
      if (existingIndex !== -1) {
        chats[existingIndex]["settings"] = action.payload?.settings;
        state.chats = [...chats];
      }
    },
    setChatUnseen: (state, action) => {
      const stateData = JSON.parse(JSON.stringify(state));
      if (
        action.payload.userId === action.payload.receiverId &&
        stateData?.chat?._id !== action.payload.chatId
      ) {
        let chats = JSON.parse(JSON.stringify(state.chats));

        const existingIndex = stateData?.chats.findIndex(
          (chat) => chat._id === action.payload.chatId
        );
        if (existingIndex !== -1) {
          const old = chats[existingIndex]["total_unseen"];
          chats[existingIndex]["total_unseen"] = parseInt(old) + 1;
          state.chats = [...chats];
        }
      }
    },
    setChatSeen: (state, action) => {
      const stateData = JSON.parse(JSON.stringify(state));
      let chats = JSON.parse(JSON.stringify(state.chats));

      const existingIndex = stateData?.chats.findIndex(
        (chat) => chat._id === action.payload.chatId
      );
      if (existingIndex !== -1) {
        chats[existingIndex]["total_unseen"] = 0;
        state.chats = [...chats];
      }

      // // inbox part
      // let inboxChats = JSON.parse(JSON.stringify(state.inboxChats));
      // const inboxExistingIndex = stateData?.inboxChats.findIndex(
      //   (chat) => chat._id === action.payload.chatId
      // );
      // if (inboxExistingIndex !== -1) {
      //   inboxChats[inboxExistingIndex]["total_unseen"] = 0;
      //   state.inboxChats = [...inboxChats];
      // }
    },

    // for inbox chat
    setInboxMessages: (state, action) => {
      state.inboxMessages = action.payload;
    },
    setInboxMessagePush: (state, action) => {
      const stateData = JSON.parse(JSON.stringify(state));
      if (action.payload?.chatId === stateData?.inboxChat?._id) {
        state.inboxMessages.push(action.payload);
      }
    },
    setInboxLastMessages: (state, action) => {
      let chats = JSON.parse(JSON.stringify(state.inboxChats));

      const existingIndex = chats.findIndex(
        (chat) => chat._id === action.payload.chatId
      );

      if (existingIndex !== -1) {
        // Update the existing chat's lastMessage
        chats[existingIndex]["lastMessage"] = action.payload;
        const sortByIsoDateDesc = (a, b) =>
          new Date(b.lastMessage?.createdAt) -
          new Date(a.lastMessage?.createdAt);

        const sortedChats = [...chats].sort(sortByIsoDateDesc);
        state.inboxChats = sortedChats;
      }
    },

    setInboxChats: (state, action) => {
      const chats = action.payload;
      if (Array.isArray(chats)) {
        const sortByIsoDateDesc = (a, b) =>
          new Date(b.lastMessage?.createdAt) -
          new Date(a.lastMessage?.createdAt);
        const sortedDateArrayDesc = [...chats].sort(sortByIsoDateDesc);
        state.inboxChats = sortedDateArrayDesc;
      } else {
        console.error("Invalid chats data:", chats);
      }
    },
    setInboxChat: (state, action) => {
      state.inboxChat = action.payload;
    },

    setInboxChatSetting: (state, action) => {
      let chats = JSON.parse(JSON.stringify(state.inboxChats));
      const stateData = JSON.parse(JSON.stringify(state));

      let inboxChat = stateData?.inboxChat;
      const existingIndex = stateData?.inboxChats.findIndex(
        (chat) => chat._id === action.payload.chatId
      );
      if (inboxChat && inboxChat?._id === action.payload.chatId) {
        inboxChat["settings"] = action.payload?.settings;
        state.inboxChat = inboxChat;
      }

      if (existingIndex !== -1) {
        chats[existingIndex]["settings"] = action.payload?.settings;
        state.inboxChats = [...chats];
      }
    },
    setInboxChatUnseen: (state, action) => {
      const stateData = JSON.parse(JSON.stringify(state));
      if (
        action.payload.userId === action.payload.receiverId &&
        stateData?.inboxChat?._id !== action.payload.chatId
      ) {
        let chats = JSON.parse(JSON.stringify(state.inboxChats));

        const existingIndex = stateData?.inboxChats.findIndex(
          (chat) => chat._id === action.payload.chatId
        );
        if (existingIndex !== -1) {
          const old = chats[existingIndex]["total_unseen"];
          chats[existingIndex]["total_unseen"] = parseInt(old) + 1;
          state.inboxChats = [...chats];
        }
      }
    },

    // globally for both
    setLastChat: (state, action) => {
      console.log("action");
      const stateData = JSON.parse(JSON.stringify(state));

      let inboxChat = stateData?.inboxChat;
      let chat = stateData?.chat;

      if (inboxChat && inboxChat?._id === action.payload.chatId) {
        inboxChat["lastMessage"] = action.payload;
        state.inboxChat = inboxChat;
      }
      if (chat && chat?._id === action.payload.chatId) {
        chat["lastMessage"] = action.payload;
        state.chat = chat;
      }
    },
    setNewChat: (state, action) => {
      const stateData = JSON.parse(JSON.stringify(state));

      let chats = [action.payload, ...stateData.chats];
      let inboxChats = [action.payload, ...stateData.inboxChats];
      if (chats) {
        state.chats = chats;
      }
      if (inboxChats) {
        state.inboxChats = inboxChats;
      }
    },

    // others

    handelClosePopup: (state, action) => {},
    // logout action
    handleClearConversations: (state, action) => {},

    // notifications
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setTotalNotifications: (state, action) => {
      state.totalNotifications = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setVideo: (state, action) => {
      state.video = action.payload;
    },
    setDocument: (state, action) => {
      state.document = action.payload;
    },
  },
});

export const {
  setMessages,
  setMessagePush,
  setLastMessages,
  setNtfAlert,
  setOnline_users,
  setChat,
  setChats,
  handelClosePopup,
  setChatSetting,
  setChatUnseen,
  setChatSeen,

  // close all for logout
  handleClearConversations,

  //setNotifications
  setNotifications,
  setTotalNotifications,

  // files for send message
  setImages,
  setVideo,
  setDocument,

  // globally for both
  setLastChat,
  setNewChat,

  // inbox
  setInboxMessages,
  setInboxMessagePush,
  setInboxLastMessages,
  setInboxChats,
  setInboxChat,
  setInboxChatSetting,
  setInboxChatUnseen,
} = conversationSlice.actions;

export default conversationSlice.reducer;
