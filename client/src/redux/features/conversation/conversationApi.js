import { api } from "../../api/apiSlice";
import { setMessages } from "./conversationSlice";

const conversationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // add chat
    postNewChat: builder.mutation({
      query: ({ data }) => ({
        url: `/chats/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["chats"],
    }),

    getChatData: builder.query({
      query: (userId) => `/chats/${userId}`,
      providesTags: ["chats"],
    }),
    getGlobalChatData: builder.query({
      query: (userId) => `/chats/global/${userId}`,
      providesTags: ["chats"],
    }),
    getSingleChat: builder.query({
      query: (firstId, secondId) => `/chats/find/${firstId}/${secondId}`,
      providesTags: ["chats"],
    }),

    postNewMessage: builder.mutation({
      query: ({ data }) => ({
        url: `/messages/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["messages", "chats"],
    }),

    getMessages: builder.query({
      query: (chatId) => `/messages/${chatId}`,
      providesTags: ["messages"],
    }),
    getGlobalChatMessages: builder.query({
      query: (chatId) => `/messages/${chatId}`,
    }),
    getReceiverInfo: builder.query({
      query: (type, memberId) => `/chats/info/${type}/${memberId}`,
      providesTags: ["chats"],
    }),

    // notifications
    createNotification: builder.mutation({
      query: ({ data }) => ({
        url: `/notifications/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["notifications"],
    }),
    seenAllNotifications: builder.mutation({
      query: () => ({
        url: `/notifications/seen/all`,
        method: "PATCH",
      }),
      invalidatesTags: ["notifications"],
    }),
    seenAllMessagesByChat: builder.mutation({
      query: ({ data }) => ({
        url: `/messages/unseen-to-seen/${data?.chatId}/${data?.receiverId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["seen_messages"],
    }),
    myNotifications: builder.query({
      query: () => `/notifications/my-all`,
      providesTags: ["notifications"],
    }),
    totalUnseen: builder.query({
      query: () => `/messages/total-unseen/counts`,
      providesTags: ["messages", "seen_messages"],
    }),
  }),
});

export const {
  usePostNewChatMutation,
  useGetChatDataQuery,
  useGetGlobalChatDataQuery,
  useGetSingleChatQuery,
  usePostNewMessageMutation,
  useGetMessagesQuery,
  useGetReceiverInfoQuery,
  useGetGlobalChatMessagesQuery,

  // notifications
  useCreateNotificationMutation,
  useSeenAllNotificationsMutation,
  useMyNotificationsQuery,
  useSeenAllMessagesByChatMutation,
  useTotalUnseenQuery,
} = conversationApi;
