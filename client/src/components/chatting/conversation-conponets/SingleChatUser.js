import {
  setChatId,
  setOpenHelpCenter,
  setReceiverData,
} from "@/redux/features/conversation/conversationSlice";
import { socket_url } from "@/utils/auth/global";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const SingleChatUser = ({ chatData, type }) => {
  const { chatId } = useSelector((state) => state.conversation);
  const [receiverUser, setReceiverUser] = useState(null);
  const [lastMessage, setLastMessage] = useState(chatData?.lastMessage);
  const dispatch = useDispatch();
  const socket = useRef();
  const query =
    type === "Store"
      ? `Store/${chatData?.memberOne?.id}`
      : `User/${chatData?.memberTwo?.id}`;

  useEffect(() => {
    fetch(`https://turkey-tm-server-v2.onrender.com/api/v2/chats/info/${query}`)
      .then((res) => res.json())
      .then((data) => {
        setReceiverUser(data?.data);
      });
  }, [chatData, query]);

  const handleSetData = () => {
    dispatch(setOpenHelpCenter(false));
    dispatch(setChatId(chatData?._id));
    dispatch(setReceiverData(receiverUser));
  };

  const name = receiverUser?.name || receiverUser?.store_name;

  socket.current = io(socket_url);
  socket.current.on("getMessage", (receiveMessage) => {
    console.log(receiveMessage);
    setLastMessage(receiveMessage?.text);
    // refetch();
  });

  return (
    <button
      onClick={() => handleSetData()}
      className={`w-full flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer
            ${chatData?._id === chatId ? "bg-gray-200" : "hover:bg-gray-100"}`}
    >
      <button className="flex items-center justify-center min-w-[40px] h-10 rounded-full bg-blue-600 object-cover text-white text-[18px]">
        <span>
          {receiverUser?.store_name?.slice(0, 1) ||
            receiverUser?.name?.slice(0, 1)}{" "}
        </span>
      </button>

      <div className="w-full flex flex-col">
        <div className="flex justify-between">
          <span className="ml-2 font-semibold text-gray-600">
            {name?.length > 15 ? name?.slice(0, 15) + "..." : name}
          </span>
          <span className="block ml-2 text-sm text-gray-600">
            {moment(chatData?.lastConversationTime).fromNow()}
          </span>
        </div>
        <span className="block ml-2 text-sm text-gray-600 text-left">
          {lastMessage}
        </span>
      </div>
    </button>
  );
};

export default SingleChatUser;
