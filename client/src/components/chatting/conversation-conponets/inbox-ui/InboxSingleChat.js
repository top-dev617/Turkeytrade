import {
  setInboxChatId,
  setOpenHelpCenter,
  setInboxReceiverData,
} from "@/redux/features/conversation/conversationSlice";
import { base_url } from "@/utils/auth/global";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const InboxSingleChat = ({ chatData, type }) => {
  const { inboxChatId } = useSelector((state) => state.conversation);
  const [receiverUser, setReceiverUser] = useState(null);
  const dispatch = useDispatch();

  const query =
    type === "User"
      ? `${chatData?.memberOne?.member_type}/${chatData?.memberOne?.id}`
      : `${chatData?.memberTwo?.member_type}/${chatData?.memberTwo?.id}`;

  useEffect(() => {
    fetch(`${base_url}/chats/info/${query}`)
      .then((res) => res.json())
      .then((data) => {
        setReceiverUser(data?.data);
      });
  }, [chatData?.memberOne, query]);

  const handleSetData = () => {
    dispatch(setOpenHelpCenter(false));
    dispatch(setInboxChatId(chatData?._id));
    dispatch(setInboxReceiverData(receiverUser));
  };

  const name = receiverUser?.name || receiverUser?.store_name;
  return (
    <button
      onClick={() => handleSetData()}
      className={`w-full flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer
              ${
                chatData?._id === inboxChatId
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
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
          {chatData?.lastMessage}
        </span>
      </div>
    </button>
  );
};

export default InboxSingleChat;
