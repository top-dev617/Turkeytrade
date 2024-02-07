import React, { useEffect, useMemo, useState } from "react";
import MessageArea from "./conversation-conponets/MessageArea";
import { useDispatch, useSelector } from "react-redux";
import ChatSidebar from "./conversation-conponets/ChatSidebar";
import { useGetGlobalChatDataQuery } from "@/redux/features/conversation/conversationApi";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import HelpCenterMessageArea from "./conversation-conponets/HelpCenterMessageArea";
import {
  handelClosePopup,
  setChats,
} from "@/redux/features/conversation/conversationSlice";

const Chatting = () => {
  const { setMsgOpen } = useContext(AuthContext);
  const { chat, chats } = useSelector((state) => state.conversation);
  const { data, isLoading } = useGetGlobalChatDataQuery();
  const dispatch = useDispatch();

  useMemo(() => {
    if (data && data?.length > 0) {
      dispatch(setChats(data));
    }
  }, [data]);

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
      <>
        {/* {chat ? (
          <MessageArea chat={chat} />
        ) : (
          
        )} */}
        {chat && <MessageArea chat={chat} />}

        <ChatSidebar chatData={chats} isLoading={isLoading} />
      </>
    </div>
  );
};

export default Chatting;
