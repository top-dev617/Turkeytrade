import React, { useEffect, useState } from "react";
import MessageArea from "./conversation-conponets/MessageArea";
import { useDispatch, useSelector } from "react-redux";
import ChatSidebar from "./conversation-conponets/ChatSidebar";
import { useGetGlobalChatDataQuery } from "@/redux/features/conversation/conversationApi";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import HelpCenterMessageArea from "./conversation-conponets/HelpCenterMessageArea";
import { handelClosePopup } from "@/redux/features/conversation/conversationSlice";

const Chatting = () => {
  const { user, setMsgOpen } = useContext(AuthContext);
  const { online_users, receiverData, chatId, openHelpCenter } = useSelector(
    (state) => state.conversation
  );
  const { data, refetch, isLoading } = useGetGlobalChatDataQuery(user?._id);
  const dispatch = useDispatch();

  useEffect(() => {
    refetch();
  }, [user]);

  console.log(online_users);

  return (
    <div className="chatting shadow">
      <h4
        onClick={() => {
          dispatch(handelClosePopup());
          setMsgOpen(false);
        }}
        className="shadow-sm cursor-pointer"
      >
        Message Us
      </h4>
      {openHelpCenter ? (
        <>
          <HelpCenterMessageArea auth={user} />
        </>
      ) : (
        <>
          {chatId && receiverData ? (
            <MessageArea chatId={chatId} auth={user} />
          ) : (
            <ChatSidebar chatData={data} isLoading={isLoading} />
          )}
        </>
      )}
    </div>
  );
};

export default Chatting;
