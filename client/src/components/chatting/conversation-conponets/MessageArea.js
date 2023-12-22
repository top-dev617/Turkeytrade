import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendMessageBox from "./SendMessageBox";
import SingleMessage from "./SingleMessage";
import {
  setChatId,
  setImage,
  setMessages,
  setMessagesPush,
  setNotifications,
  setReceiverData,
  setTotalNotifications,
} from "@/redux/features/conversation/conversationSlice";
import {
  useGetGlobalChatMessagesQuery,
  useGetMessagesQuery,
  usePostNewMessageMutation,
  useSeenAllMessagesByChatMutation,
} from "@/redux/features/conversation/conversationApi";
import Link from "next/link";
import moment from "moment";
import Loading from "@/components/commons/Loading";
import { io } from "socket.io-client";
import { useRef } from "react";
import { base_url, socket_url } from "@/utils/auth/global";
import { useEffect } from "react";
import { AuthContext } from "@/components/context/AuthContext";

const MessageArea = ({ auth, messageClassName }) => {
  const { receiverData, chatId, online_users, messages, image } = useSelector(
    (state) => state.conversation
  );
  const { data, refetch, isLoading } = useGetGlobalChatMessagesQuery(chatId);
  const [postNewMessage] = usePostNewMessageMutation();
  const [seenAllMessagesByChat] = useSeenAllMessagesByChatMutation();
  const dispatch = useDispatch();
  const socket = useRef();

  const handleSeenAll = async () => {
    const options = {
      data: { chatId: chatId },
    };
    const result = await seenAllMessagesByChat(options);
    console.log(result);
  };

  useEffect(() => {
    handleSeenAll();
    return () => {};
  }, [chatId, messages]);

  useEffect(() => {
    refetch();
    return () => {};
  }, [chatId]);

  useEffect(() => {
    dispatch(setMessages(data));
    socket.current = io(socket_url, {
      credentials: true,
    });
    return () => {};
  }, [data]);

  const sendMessage = async (message) => {
    const newMessage = {
      text: message,
      chatId: chatId,
      senderId: auth?._id,
      sender_type: receiverData?.store_name ? "User" : "Store",
      members: [receiverData?._id, auth?._id],
      productId: "",
    };

    const newMessageFormData = new FormData();
    newMessageFormData.append(`message`, JSON.stringify(newMessage));

    if (image) {
      [image].forEach((file, index) => {
        newMessageFormData.append(`images`, file);
      });
    }

    const options = {
      data: newMessageFormData,
    };
    const result = await postNewMessage(options);

    if (result) {
      const sendMessage = {
        senderId: auth?._id,
        receiverId: receiverData?._id,
        chatId: chatId,
        sender_type: receiverData?.store_name ? "User" : "Store",
        text: message,
        createdAt: Date.now(),
        images: result?.data?.images,
      };

      socket.current.emit("sendMessage", sendMessage);
      dispatch(setImage(null));

      // receive message
      socket.current.on("getMessage", (receiveMessage) => {
        if (receiveMessage?.chatId === chatId) {
          dispatch(setMessagesPush(receiveMessage));
        }
      });
    }
  };

  const handleBack = () => {
    dispatch(setReceiverData(null));
    dispatch(setChatId(""));
  };

  // console.log(messages);

  const lastMessage = messages?.length > 0 && messages[messages?.length - 1];
  const isOnline = online_users.some(
    (user) => user?.userId === receiverData?._id
  );
  return (
    <>
      {chatId && !isLoading ? (
        <>
          <div className="flex items-center justify-between border-b p-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBack()}
                className="inline-flex hover:bg-indigo-50 rounded-full p-2"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="currentColor"
                  className="w-5 h-5 hover:text-pm"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>
              </button>
              <div className="flex items-center">
                <button className="flex items-center justify-center min-w-[40px] !w-[40px] h-10 rounded-full bg-blue-600 object-cover text-white text-[18px]">
                  {receiverData?.logo || receiverData?.image ? (
                    <img
                      className="w-full h-full rounded-full bg-white object-cover"
                      src={`${base_url}/uploads/${
                        receiverData?.logo || receiverData?.image
                      }`}
                      alt=""
                    />
                  ) : (
                    <span>
                      {receiverData?.store_name?.slice(0, 1) ||
                        receiverData?.name?.slice(0, 1)}{" "}
                    </span>
                  )}
                </button>
                <div className="pl-2">
                  <div className="font-semibold">
                    {receiverData?.name ? (
                      <p>
                        {(receiverData?.name || receiverData?.store_name)
                          ?.length > 12
                          ? (
                              receiverData?.name || receiverData?.store_name
                            ).slice(0, 12) + "..."
                          : receiverData?.name || receiverData?.store_name}
                      </p>
                    ) : (
                      <Link
                        href={`/store/${
                          receiverData?._id || receiverData?._id
                        }`}
                        className="hover:underline"
                      >
                        {(receiverData?.name || receiverData?.store_name)
                          ?.length > 12
                          ? (
                              receiverData?.name || receiverData?.store_name
                            ).slice(0, 12) + "..."
                          : receiverData?.name || receiverData?.store_name}
                      </Link>
                    )}
                  </div>
                  {isOnline ? (
                    <span className="text-pm text-xs">online</span>
                  ) : (
                    <div className="text-xs text-gray-600">
                      {moment(lastMessage?.createdAt).fromNow()}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <button className="inline-flex hover:bg-indigo-50 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
            className={`flex-1 px-2 py-4 scrollBar overflow-y-auto ${messageClassName}`}
          >
            {isLoading ? (
              <Loading />
            ) : (
              messages?.map((message, i) => (
                <SingleMessage key={i} message={message} auth={auth} />
              ))
            )}
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
  );
};

export default MessageArea;
