import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetChatDataQuery,
  useGetMessagesQuery,
  useGetSingleChatQuery,
  usePostNewChatMutation,
  usePostNewMessageMutation,
} from "@/redux/features/conversation/conversationApi";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import MessageArea from "../chatting/conversation-conponets/MessageArea";
import SendMessageBox from "../chatting/conversation-conponets/SendMessageBox";
import SingleMessage from "../chatting/conversation-conponets/SingleMessage";
import { useState } from "react";
import Loading from "../commons/Loading";

const StoreChat = ({ store, chatId }) => {
  const { user } = useContext(AuthContext);
  const receiverData = store;
  const { data: messages, isLoading } = useGetMessagesQuery(chatId);
  const [postNewMessage] = usePostNewMessageMutation();
  const [fullScreen, setFullScreen] = useState(false);

  const sendMessage = async (message) => {
    const newMessage = {
      text: message,
      storeId: receiverData?._id,
      chatId: chatId,
      senderId: user?._id,
      members: [receiverData?._id, user?._id],
      productId: "",
    };

    const options = {
      data: newMessage,
    };
    const result = await postNewMessage(options);
  };
  return (
    <div
      className={`h-fit bg-white ${
        fullScreen
          ? "fixed top-0 right-0 bottom-0 left-0 w-full h-full z-50"
          : ""
      }`}
    >
      <>
        {isLoading && <Loading />}

        {chatId ? (
          <>
            <div class="flex items-center justify-between border-b p-2">
              <div className="flex items-center gap-2">
                <div class="flex items-center">
                  <button className="flex items-center justify-center min-w-[40px] h-10 rounded-full bg-blue-600 object-cover text-white text-[18px]">
                    <span>
                      {receiverData?.name?.slice(0, 1) ||
                        receiverData?.store_name?.slice(0, 1)}{" "}
                    </span>
                  </button>
                  <div class="pl-2">
                    <div class="font-semibold">
                      <p class="hover:underline">
                        {receiverData?.name || receiverData?.store_name}
                      </p>
                    </div>
                    <div class="text-xs text-gray-600">Online</div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => setFullScreen(!fullScreen)}
                  class="inline-flex hover:bg-indigo-50 rounded-full p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              className={`flex-1 px-4 py-4 scrollBar overflow-y-auto 
                        ${fullScreen ? "h-[70%]" : "min-h-[400px]"}`}
            >
              {messages?.map((message, i) => (
                <SingleMessage key={i} message={message} auth={user} />
              ))}
            </div>

            <SendMessageBox sendMessage={sendMessage} />
          </>
        ) : (
          <div className="flex justify-center items-center">
            <img
              className="w-[300px] mx-auto"
              src="https://cdni.iconscout.com/illustration/free/thumb/free-no-messages-4085820-3385489.png"
            />
          </div>
        )}
      </>
    </div>
  );
};

export default StoreChat;
