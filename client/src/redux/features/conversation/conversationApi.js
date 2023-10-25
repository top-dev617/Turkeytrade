import { api } from "../../api/apiSlice";

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
        getReceiverInfo: builder.query({
            query: (type, memberId) => `/chats/info/${type}/${memberId}`,
            providesTags: ["chats"],
        }),
    }),
});

export const {
    usePostNewChatMutation,
    useGetChatDataQuery,
    useGetSingleChatQuery,
    usePostNewMessageMutation,
    useGetMessagesQuery,
    useGetReceiverInfoQuery
} = conversationApi;
